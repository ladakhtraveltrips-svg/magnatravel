/**
 * Conversion tracking helpers.
 *
 * Every event is pushed to window.dataLayer, so Google Tag Manager can route it to
 * GA4, Google Ads conversions and remarketing using "Custom Event" triggers with
 * these exact names. Page views are never sent as lead events.
 */

export const EVENTS = {
  LEAD: "generate_lead",
  WHATSAPP: "whatsapp_click",
  PHONE: "phone_call_click",
  PACKAGE_ENQUIRY: "package_enquiry",
};

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

export function pushEvent(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const firedLeads = new Set();

/**
 * Fire ONLY after the server confirmed the enquiry was accepted.
 * `leadId` comes from the API response and de-duplicates the conversion
 * (repeat calls with the same id are ignored, and Google Ads receives it as transaction_id).
 */
export function trackLead(leadId, params = {}) {
  if (!leadId || firedLeads.has(leadId)) return;
  firedLeads.add(leadId);

  pushEvent(EVENTS.LEAD, { lead_id: leadId, ...params });

  // Optional direct Google Ads conversion (only when not configured inside GTM).
  if (ADS_ID && ADS_LEAD_LABEL && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}`, transaction_id: leadId });
  }
}
