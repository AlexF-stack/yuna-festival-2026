import { Resend } from "resend";

import { FESTIVAL } from "@/lib/festival";
import {
  displayPassName,
  passStubHint,
  passTypeLabel,
  passWhenLine,
} from "@/lib/pass-copy";
import { generateRegistrationQrPng } from "@/lib/registration-qr";
import { isRegistrationType } from "@/lib/registration-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SITE_CONTACT } from "@/lib/site";

export type NotifyJob = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registrationType: string;
  confirmationUrl: string;
  /** Mail de correction (ticket mis à jour) vs première confirmation. */
  purpose?: "confirmation" | "update";
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
  return isRegistrationType(registrationType)
    ? passTypeLabel(registrationType)
    : registrationType;
}

function confirmationBody(job: NotifyJob): string {
  const update = job.purpose === "update";
  return (
    (update
      ? `YUNA Festival 2026 : ton pass a été mis à jour\n`
      : `YUNA Festival 2026 : inscription confirmée ✓\n`) +
    `${displayPassName(job.name)} · ${typeLabel(job.registrationType)}\n` +
    `Le QR est joint à ce mail. Présente-le à l'entrée.\n` +
    `Lien de secours : ${job.confirmationUrl}\n` +
    `${passWhenLine(
      isRegistrationType(job.registrationType)
        ? job.registrationType
        : "pass",
    )}.`
  );
}

function passTicketHtml(job: NotifyJob): string {
  const type = typeLabel(job.registrationType);
  const name = displayPassName(job.name);
  const shortId = job.id.slice(0, 8).toUpperCase();
  const when = isRegistrationType(job.registrationType)
    ? passWhenLine(job.registrationType)
    : `${FESTIVAL.datesShort} · ${FESTIVAL.locationLine}`;
  const hint = isRegistrationType(job.registrationType)
    ? passStubHint(job.registrationType)
    : FESTIVAL.freeEntry;

  return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#0A0E14;border-radius:16px;">
            <tr>
              <td style="padding:8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="58%" valign="top" style="background:#0077BB;padding:18px 16px;color:#FFF8F1;">
                      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#FCD116;">YUNA Festival</p>
                      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FCD116;">${escapeHtml(type)}</p>
                      <p style="margin:0 0 14px;font-size:22px;line-height:1.15;font-weight:800;color:#ffffff;">${escapeHtml(name)}</p>
                      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#FCD116;">${escapeHtml(when)}</p>
                    </td>
                    <td width="42%" valign="middle" align="center" style="background:#ffffff;padding:14px 10px;">
                      <img src="cid:yuna-qr" width="150" height="150" alt="QR code ticket ${escapeAttr(name)}" style="display:block;margin:0 auto;width:150px;height:150px;border:0;"/>
                      <p style="margin:10px 0 0;font-size:11px;font-weight:800;text-transform:uppercase;color:#0077BB;">${escapeHtml(type)}</p>
                      <p style="margin:4px 0 0;font-size:11px;color:#4a5560;">${escapeHtml(hint)}</p>
                      <p style="margin:10px 0 0;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#8b99a8;">YUNA ${FESTIVAL.edition} · ${shortId}</p>
                      <p style="margin:4px 0 0;font-size:11px;font-weight:700;text-transform:uppercase;color:#008751;">${escapeHtml(FESTIVAL.freeEntry)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>`;
}

function passEmailHtml(job: NotifyJob): string {
  const type = typeLabel(job.registrationType);
  const shortId = job.id.slice(0, 8).toUpperCase();
  const update = job.purpose === "update";
  const title = update ? "Ton pass a été mis à jour" : "Ton pass QR est dans ce mail";
  const lead = update
    ? `on a corrigé l’affichage du ticket. Le QR ci-dessous suffit à l’entrée — pas besoin d’ouvrir le site.`
    : `ton inscription <strong>${escapeHtml(type)}</strong> est confirmée. Le QR ci-dessous suffit à l’entrée.`;

  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#FFF8F1;font-family:Arial,Helvetica,sans-serif;color:#0A1628;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F1;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #d6e6f2;padding:24px 18px;">
        <tr><td>
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#FF3B00;">YUNA Festival 2026</p>
          <h1 style="margin:0 0 12px;font-size:24px;line-height:1.15;color:#0077BB;">${title}</h1>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#334155;">
            Bonjour <strong>${escapeHtml(displayPassName(job.name))}</strong>,<br/>
            ${lead}
          </p>
          ${passTicketHtml(job)}
          <p style="margin:18px 0 0;font-size:13px;color:#64748b;">Réf. ticket : YUNA-${shortId} · aussi en pièce jointe PNG.</p>
          <p style="margin:16px 0 0;">
            <a href="${escapeAttr(job.confirmationUrl)}"
               style="display:inline-block;background:#FF3B00;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;">
              Version en ligne (secours)
            </a>
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

export async function sendPassEmail(job: NotifyJob): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("RESEND_API_KEY manquant");
  if (!job.email) throw new Error("E-mail destinataire manquant");

  const qrPng = await generateRegistrationQrPng(job.id);
  const type = typeLabel(job.registrationType);
  const shortId = job.id.slice(0, 8).toUpperCase();
  const subject =
    job.purpose === "update"
      ? `Ton pass YUNA a été mis à jour · ${type}`
      : `Ton pass YUNA · ${type}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: resendFrom(),
    to: job.email,
    replyTo: SITE_CONTACT.email,
    subject,
    html: passEmailHtml(job),
    text: confirmationBody(job),
    attachments: [
      {
        filename: `yuna-pass-${shortId}.png`,
        content: qrPng,
        contentId: "yuna-qr",
      },
    ],
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
