import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { REGISTRATION_TYPE_LABELS } from "@/lib/registration-types";

export type NotifyJob = {
  id: string;
  name: string;
  phone: string;
  registrationType: string;
  confirmationUrl: string;
};

export type MessagingCapabilities = {
  whatsapp: boolean;
  sms: boolean;
  any: boolean;
};

export function getMessagingCapabilities(): MessagingCapabilities {
  const twilio =
    Boolean(process.env.TWILIO_ACCOUNT_SID?.trim()) &&
    Boolean(process.env.TWILIO_AUTH_TOKEN?.trim());
  const whatsapp =
    twilio &&
    Boolean(
      process.env.TWILIO_WHATSAPP_FROM?.trim() ||
        process.env.TWILIO_WHATSAPP_CONTENT_SID?.trim(),
    );
  const sms = twilio && Boolean(process.env.TWILIO_SMS_FROM?.trim());
  const meta =
    Boolean(process.env.WHATSAPP_TOKEN?.trim()) &&
    Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID?.trim()) &&
    Boolean(process.env.WHATSAPP_TEMPLATE_NAME?.trim());

  return {
    whatsapp: whatsapp || meta,
    sms,
    any: whatsapp || meta || sms,
  };
}

function confirmationBody(job: NotifyJob): string {
  const type =
    job.registrationType in REGISTRATION_TYPE_LABELS
      ? REGISTRATION_TYPE_LABELS[
          job.registrationType as keyof typeof REGISTRATION_TYPE_LABELS
        ]
      : job.registrationType;
  return (
    `YUNA Festival 2026 : inscription confirmée ✓\n` +
    `${job.name} · ${type}\n` +
    `Ton pass QR : ${job.confirmationUrl}\n` +
    `Présente-le à l'entrée (5–6 sept, Cotonou).`
  );
}

async function twilioSend(params: Record<string, string>): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID!.trim();
  const token = process.env.TWILIO_AUTH_TOKEN!.trim();
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const body = new URLSearchParams(params);
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twilio ${res.status}: ${text.slice(0, 280)}`);
  }
}

async function sendTwilioWhatsApp(job: NotifyJob): Promise<void> {
  const from = process.env.TWILIO_WHATSAPP_FROM?.trim();
  if (!from) throw new Error("TWILIO_WHATSAPP_FROM manquant");

  const to = job.phone.startsWith("whatsapp:")
    ? job.phone
    : `whatsapp:${job.phone}`;
  const contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID?.trim();

  if (contentSid) {
    await twilioSend({
      From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
      To: to,
      ContentSid: contentSid,
      ContentVariables: JSON.stringify({
        1: job.name,
        2: job.confirmationUrl,
      }),
    });
    return;
  }

  await twilioSend({
    From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
    To: to,
    Body: confirmationBody(job),
  });
}

async function sendTwilioSms(job: NotifyJob): Promise<void> {
  const from = process.env.TWILIO_SMS_FROM?.trim();
  if (!from) throw new Error("TWILIO_SMS_FROM manquant");
  await twilioSend({
    From: from,
    To: job.phone,
    Body: confirmationBody(job),
  });
}

/** Meta Cloud API — template utility pré-approuvé. */
async function sendMetaWhatsApp(job: NotifyJob): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN!.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!.trim();
  const template = process.env.WHATSAPP_TEMPLATE_NAME!.trim();
  const lang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || "fr";

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: job.phone.replace(/^\+/, ""),
        type: "template",
        template: {
          name: template,
          language: { code: lang },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: job.name },
                { type: "text", text: job.confirmationUrl },
              ],
            },
          ],
        },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Meta WA ${res.status}: ${text.slice(0, 280)}`);
  }
}

async function markNotify(
  id: string,
  patch: {
    notify_status: string;
    notify_channel: string;
    notified_at?: string | null;
    notify_error?: string | null;
  },
) {
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("registrations")
      .update(patch as never)
      .eq("id", id);
    if (error?.message?.includes("notify_status")) {
      // Migration pas encore appliquée — ignorer.
      return;
    }
    if (error) {
      console.error("[messaging] markNotify", error.message);
    }
  } catch (err) {
    console.error("[messaging] markNotify", err);
  }
}

/**
 * Envoi confirmation — WhatsApp prioritaire, SMS en secours.
 * À appeler uniquement depuis `after()` (ne pas bloquer /api/register).
 */
export async function sendRegistrationConfirmation(
  job: NotifyJob,
): Promise<{ channel: "whatsapp" | "sms" | "none"; ok: boolean }> {
  const caps = getMessagingCapabilities();
  if (!caps.any) {
    await markNotify(job.id, {
      notify_status: "skipped",
      notify_channel: "none",
      notify_error: "Aucun canal configuré (Twilio / Meta)",
    });
    return { channel: "none", ok: false };
  }

  const errors: string[] = [];

  if (caps.whatsapp) {
    try {
      if (
        process.env.WHATSAPP_TOKEN?.trim() &&
        process.env.WHATSAPP_PHONE_NUMBER_ID?.trim()
      ) {
        await sendMetaWhatsApp(job);
      } else {
        await sendTwilioWhatsApp(job);
      }
      await markNotify(job.id, {
        notify_status: "sent",
        notify_channel: "whatsapp",
        notified_at: new Date().toISOString(),
        notify_error: null,
      });
      return { channel: "whatsapp", ok: true };
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (caps.sms) {
    try {
      await sendTwilioSms(job);
      await markNotify(job.id, {
        notify_status: "sent",
        notify_channel: "sms",
        notified_at: new Date().toISOString(),
        notify_error: errors.length ? errors.join(" | ") : null,
      });
      return { channel: "sms", ok: true };
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  await markNotify(job.id, {
    notify_status: "failed",
    notify_channel: "none",
    notify_error: errors.join(" | ").slice(0, 500),
  });
  console.error("[messaging] confirmation failed", job.id, errors);
  return { channel: "none", ok: false };
}
