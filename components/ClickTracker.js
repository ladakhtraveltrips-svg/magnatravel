"use client";

import { useEffect } from "react";
import { EVENTS, pushEvent } from "@/lib/analytics";

export const PREFILL_EVENT = "magna:prefill";

/**
 * One delegated click listener for the whole page, so links can stay in server
 * components:
 *  - tel: links            -> phone_call_click
 *  - wa.me links           -> whatsapp_click
 *  - [data-package]        -> package_enquiry + pre-fills the enquiry form
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
      if (pkg) {
        pushEvent(EVENTS.PACKAGE_ENQUIRY, { package_name: pkg, click_location: location });
        window.dispatchEvent(
          new CustomEvent(PREFILL_EVENT, {
            detail: {
              packageType: el.dataset.packageType || pkg,
              destination: el.dataset.destination || "",
              days: el.dataset.days || "",
              message: el.dataset.message || "",
            },
          })
        );
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
