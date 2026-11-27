"use client";

import { useEffect } from "react";
import { EVENTS, pushEvent } from "@/lib/analytics";

export const PREFILL_EVENT = "magna:prefill";
export const OPEN_ENQUIRY_EVENT = "magna:open-enquiry";

/**
 * One delegated click listener for the whole page, so links can stay in server
 * components:
 *  - tel: links            -> phone_call_click
 *  - wa.me links           -> whatsapp_click
 *  - [data-package]        -> package_enquiry + pre-fills the enquiry form
 *  - any "#enquiry" button -> opens the enquiry popup (instead of scrolling)
 *    Plain navigation links (inside <nav>, e.g. "Contact") still scroll,
 *    unless they carry data-popup.
 * Each element can set data-location="hero|header|..." for reporting.
 */
export default function ClickTracker() {
  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest?.("a, button");
      if (!el) return;
      const location = el.closest("[data-location]")?.dataset.location || "page";
      const href = el.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        pushEvent(EVENTS.PHONE, { phone_number: href.replace("tel:", ""), click_location: location });
      } else if (href.includes("wa.me/")) {
        pushEvent(EVENTS.WHATSAPP, { click_location: location });
      }

      const pkg = el.dataset.package;
      const detail = {
        label: pkg || "",
        packageType: el.dataset.packageType || pkg || "",
        destination: el.dataset.destination || "",
        days: el.dataset.days || "",
        message: el.dataset.message || "",
      };

      if (pkg) {
        pushEvent(EVENTS.PACKAGE_ENQUIRY, { package_name: pkg, click_location: location });
        window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
      }

      const opensPopup =
        href.endsWith("#enquiry") && window.__magnaEnquiryPopup && (!el.closest("nav") || el.dataset.popup);
      if (opensPopup) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(OPEN_ENQUIRY_EVENT, { detail }));
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
