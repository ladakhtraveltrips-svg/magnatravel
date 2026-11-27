"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { OPEN_ENQUIRY_EVENT } from "./ClickTracker";
import { LogoBadge } from "./Logo";

const OPEN_DELAY_MS = 1500;
const SEEN_KEY = "magna_enquiry_popup_seen";

const wasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
};

/**
 * Enquiry form popup.
 *  - Opens automatically shortly after the page loads (once per browser session).
 *  - Opens every time an "Enquire" / "Get Free Quote" button is clicked (see ClickTracker),
 *    pre-filled with that button's package / destination.
 * Closable with the X button, Esc or a click outside.
 */
export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);

  // Auto-open once per session.
  useEffect(() => {
    if (wasSeen()) return;
    const t = setTimeout(() => {
      if (wasSeen()) return; // visitor already opened it from a button
      lastFocus.current = document.activeElement;
      setOpen(true);
      markSeen();
    }, OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Open from any enquiry button.
  useEffect(() => {
    window.__magnaEnquiryPopup = true;
    function onOpen(e) {
      lastFocus.current = document.activeElement;
      setPrefill(e.detail || null);
      setFormKey((k) => k + 1); // fresh form with the new pre-filled values
      setOpen(true);
      markSeen();
    }
    window.addEventListener(OPEN_ENQUIRY_EVENT, onOpen);
    return () => {
      window.__magnaEnquiryPopup = false;
      window.removeEventListener(OPEN_ENQUIRY_EVENT, onOpen);
    };
  }, []);

  // What the visitor clicked on, shown under the heading (e.g. "Gulmarg tour", "Kashmir Honeymoon Package").
  const selection = prefill?.destination
    ? `${prefill.destination} tour`
    : prefill?.message?.replace(/^I'm interested in:\s*/, "") ||
      (prefill?.label && prefill.label !== "All Kashmir Packages" ? prefill.label : "");

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  // Esc to close, keep focus inside the dialog, lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFirst = setTimeout(() => dialogRef.current?.querySelector("input, select, button")?.focus(), 50);

    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll("a[href], button, input:not([tabindex='-1']), select, textarea")].filter(
        (el) => !el.disabled && el.offsetParent !== null
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusFirst);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-float sm:max-w-lg sm:rounded-[24px] sm:p-7"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close enquiry form"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-mint hover:text-navy"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="mb-5 flex items-center gap-3 pr-8">
                <LogoBadge size={44} />
                <div>
                  <p id="popup-heading" className="font-display text-lg font-bold leading-tight text-navy sm:text-xl">
                    Get Your Free Kashmir Tour Quote
                  </p>
                  {selection ? (
                    <p className="mt-1 inline-flex rounded-full bg-mint px-2.5 py-0.5 text-[12.5px] font-semibold text-primary">
                      {selection}
                    </p>
                  ) : (
                    <p className="mt-0.5 text-[13px] text-muted">Share your details, our team will call you back.</p>
                  )}
                </div>
              </div>

              <EnquiryForm key={formKey} idPrefix="popup-" formName="popup_enquiry" bare prefill={prefill} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
