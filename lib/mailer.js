import nodemailer from "nodemailer";
import { BUSINESS } from "./constants";

/**
 * Sends every enquiry to the business inbox over SMTP.
 *
 * Gmail setup (recommended):
 *   SMTP_USER = magnatravelskashmir@gmail.com
 *   SMTP_PASS = 16-character Google "App Password" (NOT the normal Gmail password)
 * Any other provider (Hostinger, Zoho, GoDaddy, cPanel mail…) works by setting SMTP_HOST / SMTP_PORT.
 */

const env = (k, d = "") => (process.env[k] || d).trim();

export function isEmailConfigured() {
  return Boolean(env("SMTP_USER") && env("SMTP_PASS"));
}

function recipients() {
  const list = env("ENQUIRY_TO_EMAIL", BUSINESS.emails.join(","));
  return list
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const port = Number(env("SMTP_PORT", "465"));
  transporter = nodemailer.createTransport({
    host: env("SMTP_HOST", "smtp.gmail.com"),
    port,
    secure: port === 465,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function formatDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return iso || "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formLabel(source) {
  if (source === "popup_enquiry") return "Popup form";
  if (source === "kashmir_enquiry") return "Enquiry section form";
  return source || "Website form";
}

export async function sendEnquiryEmail(lead) {
  const ref = lead.leadId.slice(0, 8).toUpperCase();
  const travellers = lead.children
    ? `${lead.adults} adults + ${lead.children} children`
    : `${lead.adults} ${lead.adults === 1 ? "traveller" : "travellers"}`;
  const prettyMobile = lead.mobile.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");
  const waText = encodeURIComponent(
    `Hi ${lead.fullName}, thank you for your Kashmir tour enquiry with Magna Travels (Ref ${ref}).`
  );
  const mobileDigits = lead.mobile.replace(/\D/g, "");
  const att = lead.attribution || {};
  const campaign = [att.utm_source, att.utm_medium, att.utm_campaign, att.utm_term].filter(Boolean).join(" / ");
  const submitted = new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const rows = [
    ["Name", lead.fullName],
    ["Mobile", prettyMobile],
    ["Travel date", formatDate(lead.travelDate)],
    ["Travellers", travellers],
    ["Package", lead.packageType],
    ["Destination", lead.destination],
    ["Days", lead.days],
    ["Email", lead.email],
    ["Notes", lead.message],
    ["Form", formLabel(lead.formName)],
    ["Campaign", campaign],
    ["Google Ads click", att.gclid ? "Yes (gclid)" : ""],
    ["Page", lead.pageUrl],
    ["Submitted", `${submitted} IST`],
  ].filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");

  const html = `<!doctype html><html><body style="margin:0;background:#F7FAF9;font-family:Arial,Helvetica,sans-serif;color:#192B35">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7FAF9;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #E2EBE8;border-radius:14px;overflow:hidden">
        <tr><td style="background:#123B3A;padding:18px 24px;color:#ffffff">
          <div style="font-size:12px;letter-spacing:2px;color:#D5A85B;text-transform:uppercase">New website enquiry · Ref ${esc(ref)}</div>
          <div style="font-size:20px;font-weight:bold;margin-top:6px">${esc(lead.fullName)} – ${esc(lead.packageType || "Kashmir Tour")}</div>
        </td></tr>
        <tr><td style="padding:18px 24px 6px">
          <a href="tel:${esc(lead.mobile)}" style="display:inline-block;background:#123B3A;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:bold;font-size:14px;margin:0 6px 8px 0">Call ${esc(prettyMobile)}</a>
          <a href="https://wa.me/${esc(mobileDigits)}?text=${waText}" style="display:inline-block;background:#1FAF54;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:bold;font-size:14px;margin:0 0 8px">WhatsApp</a>
        </td></tr>
        <tr><td style="padding:6px 24px 22px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
            ${rows
              .map(
                ([k, v]) => `<tr>
              <td style="padding:9px 0;border-bottom:1px solid #EEF3F1;color:#718096;width:130px;vertical-align:top">${esc(k)}</td>
              <td style="padding:9px 0;border-bottom:1px solid #EEF3F1;font-weight:bold;color:#0B2545;word-break:break-word">${esc(v)}</td>
            </tr>`
              )
              .join("")}
          </table>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#718096;margin-top:12px">Sent automatically by the ${esc(BUSINESS.name)} website.</div>
    </td></tr>
  </table></body></html>`;

  const text = [`New website enquiry (Ref ${ref})`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");

  const from = env("ENQUIRY_FROM_EMAIL", env("SMTP_USER"));
  await getTransporter().sendMail({
    from: `"${BUSINESS.name} Website" <${from}>`,
    to: recipients(),
    ...(lead.email && { replyTo: `"${lead.fullName}" <${lead.email}>` }),
    subject: `New Kashmir Enquiry: ${lead.fullName} – ${lead.packageType || "Kashmir Tour"} (${formatDate(lead.travelDate)})`,
    text,
    html,
  });
}
