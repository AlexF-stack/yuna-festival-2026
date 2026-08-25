import { Resend } from "resend";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { REGISTRATION_TYPE_LABELS } from "@/lib/registration-types";
import { SITE_CONTACT } from "@/lib/site";

export type NotifyJob = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registrationType: string;
  confirmationUrl: string;
};

export type MessagingCapabilities = {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  any: boolean;
};

export function getMessagingCapabilities(): MessagingCapabilities {
  const email = Boolean(process.env.RESEND_API_KEY?.trim());
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
    email,
    whatsapp: whatsapp || meta,
    sms,
    any: email || whatsapp || meta || sms,
  };
}

function typeLabel(registrationType: string): string {
  return registrationType in REGISTRATION_TYPE_LABELS
    ? REGISTRATION_TYPE_LABELS[
        registrationType as keyof typeof REGISTRATION_TYPE_LABELS
      ]
    : registrationType;
}

function confirmationBody(job: NotifyJob): string {
  return (
    `YUNA Festival 2026 : inscription confirmée ✓\n` +
    `${job.name} · ${typeLabel(job.registrationType)}\n` +
    `Ton pass QR : ${job.confirmationUrl}\n` +
    `Présente-le à l'entrée (5–6 sept, Terrain de Midombo).`
  );
}

function passEmailHtml(job: NotifyJob): string {
  const type = typeLabel(job.registrationType);
  const shortId = job.id.slice(0, 8).toUpperCase();
  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#FFF8F1;font-family:Arial,Helvetica,sans-serif;color:#0A1628;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F1;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #d6e6f2;padding:28px 24px;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#FF3B00;">YUNA Festival 2026</p>
          <h1 style="margin:0 0 12px;font-size:26px;line-height:1.15;color:#0077BB;">Ton pass QR est prêt</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#334155;">
            Bonjour <strong>${escapeHtml(job.name)}</strong>,<br/>
            ton inscription <strong>${escapeHtml(type)}</strong> est confirmée.
          </p>
          <p style="margin:0 0 20px;font-size:13px;color:#64748b;">Réf. ticket : YUNA-${shortId}</p>
          <a href="${escapeAttr(job.confirmationUrl)}"
             style="display:inline-block;background:#FF3B00;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 22px;border-radius:999px;">
            Ouvrir mon pass QR
          </a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#64748b;">
            Présente ce QR à l’entrée · 5–6 septembre 2026 · Terrain de Midombo.<br/>
            Garde aussi ce mail : tu pourras rouvrir ton pass à tout moment.
          </p>
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">
            ${escapeHtml(SITE_CONTACT.email)} · festivalyuna.com
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function resendFrom(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `YUNA Festival <${SITE_CONTACT.email}>`
  );
}

async function sendPassEmail(job: NotifyJob): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("RESEND_API_KEY manquant");
  if (!job.email) throw new Error("E-mail destinataire manquant");

  const resend = new Resend(apiKey);
  const type = typeLabel(job.registrationType);
  const { error } = await resend.emails.send({
    from: resendFrom(),
    to: job.email,
    replyTo: SITE_CONTACT.email,
    subject: `Ton pass YUNA · ${type}`,
    html: passEmailHtml(job),
    text: confirmationBody(job),
  });
  if (error) {
    throw new Error(error.message || "Resend send failed");
  }
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
 * Confirmation async : e-mail (Resend) prioritaire, puis WhatsApp / SMS.
 * À appeler uniquement depuis `after()` (ne pas bloquer /api/register).
 */
export async function sendRegistrationConfirmation(
  job: NotifyJob,
): Promise<{ channel: "email" | "whatsapp" | "sms" | "none"; ok: boolean }> {
  const caps = getMessagingCapabilities();
  const errors: string[] = [];

  if (caps.email && job.email) {
    try {
      await sendPassEmail(job);
      await markNotify(job.id, {
        notify_status: "sent",
        notify_channel: "email",
        notified_at: new Date().toISOString(),
        notify_error: null,
      });
      // WhatsApp / SMS en complément (best effort, ne pas écraser le succès mail).
      void sendSecondaryMobile(job, caps).catch(() => undefined);
      return { channel: "email", ok: true };
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  if (!caps.any && !caps.email) {
    await markNotify(job.id, {
      notify_status: "skipped",
      notify_channel: "none",
      notify_error: "Aucun canal configuré (Resend / Twilio / Meta)",
    });
    return { channel: "none", ok: false };
  }

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
        notify_error: errors.length ? errors.join(" | ") : null,
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

async function sendSecondaryMobile(
  job: NotifyJob,
  caps: MessagingCapabilities,
): Promise<void> {
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
      return;
    } catch {
      /* ignore */
    }
  }
  if (caps.sms) {
    try {
      await sendTwilioSms(job);
    } catch {
      /* ignore */
    }
  }
}
