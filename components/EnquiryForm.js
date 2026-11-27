"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Lock, Send } from "lucide-react";
import { PREFILL_EVENT } from "./ClickTracker";
import { WhatsAppIcon } from "./SocialIcons";
import { PACKAGE_TYPE_OPTIONS, whatsappHref } from "@/lib/constants";
import { trackLead } from "@/lib/analytics";
import { LIMITS, rules, todayISO } from "@/lib/validation";

const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

// Only 5 visible fields. destination / days / message / email are not shown, but are still
// filled (and sent with the lead) when a visitor comes from the search bar or a destination card.
const DEFAULTS = {
  fullName: "",
  mobile: "",
  email: "",
  travelDate: "",
  adults: "2",
  children: "0",
  destination: "",
  packageType: "",
  days: "",
  message: "",
  company_website: "", // honeypot
};

function FieldShell({ id, label, required, error, hint, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-red-500"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error.message}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

function buildWhatsAppMessage(v = {}) {
  const lines = [
    "Hi Magna Travels, I would like a Kashmir tour package quote.",
    v.fullName && `Name: ${v.fullName}`,
    v.travelDate && `Travel date: ${v.travelDate}`,
    v.adults && `Travellers: ${v.adults}`,
    v.children && v.children !== "0" && `Children: ${v.children}`,
    v.destination && `Destination: ${v.destination}`,
    v.packageType && `Package: ${v.packageType}`,
    v.days && `Days: ${v.days}`,
    v.message && `Notes: ${v.message}`,
  ];
  return lines.filter(Boolean).join("\n");
}

/**
 * @param {string} idPrefix  makes field ids unique when the form appears twice (e.g. popup + page)
 * @param {string} formName  reported with the generate_lead event
 * @param {boolean} bare     render without the outer card (used inside the popup)
 */
export default function EnquiryForm({ idPrefix = "", formName = "kashmir_enquiry", bare = false }) {
  const fid = (name) => `${idPrefix}${name}`;
  const [status, setStatus] = useState({ state: "idle", message: "", leadId: null });
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const attribution = useRef({});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: DEFAULTS, mode: "onTouched" });

  const values = watch();

  // Capture Google Ads / UTM attribution once, so leads can be matched to campaigns.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    ATTRIBUTION_KEYS.forEach((k) => params.get(k) && (found[k] = params.get(k).slice(0, 200)));
    try {
      const stored = JSON.parse(sessionStorage.getItem("magna_attribution") || "{}");
      attribution.current = { ...stored, ...found };
      sessionStorage.setItem("magna_attribution", JSON.stringify(attribution.current));
    } catch {
      attribution.current = found;
    }
  }, []);

  // Pre-fill from the quick search bar and the package / destination / experience CTAs.
  useEffect(() => {
    function onPrefill(e) {
      const detail = e.detail || {};
      setStatus((s) => (s.state === "success" ? { state: "idle", message: "", leadId: null } : s));
      Object.entries(detail).forEach(([key, value]) => {
        if (value && key in DEFAULTS) setValue(key, String(value), { shouldDirty: true });
      });
    }
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [setValue]);

  async function onSubmit(data) {
    if (inFlight.current) return; // guard against double submits
    inFlight.current = true;
    setStatus({ state: "idle", message: "", leadId: null });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "kashmir-tour-packages",
          startedAt: startedAt.current,
          pageUrl: window.location.href.split("#")[0],
          attribution: attribution.current,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok || !json.leadId) {
        throw new Error(json.error || "We couldn't send your enquiry right now.");
      }

      // Conversion fires only on a confirmed, successful submission (de-duplicated by leadId).
      trackLead(json.leadId, {
        form_name: formName,
        package_type: data.packageType || "not_specified",
        destination: data.destination || "not_specified",
      });

      setStatus({ state: "success", message: "", leadId: json.leadId });
      reset(DEFAULTS);
      startedAt.current = Date.now();
    } catch (err) {
      setStatus({
        state: "error",
        message: err?.message || "Something went wrong. Please try again.",
        leadId: null,
      });
    } finally {
      inFlight.current = false;
    }
  }

  const aria = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  });

  const waFallback = whatsappHref(buildWhatsAppMessage(values));

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={bare ? "relative" : "card relative overflow-hidden p-5 shadow-float sm:p-7"}
        data-location={bare ? "popup_form" : "enquiry_form"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status.state === "success" ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-10 text-center"
              role="status"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-primary">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold">Thank you! Your enquiry has been received.</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Our Kashmir travel team will contact you shortly with a customized itinerary and quotation.
              </p>
              <p className="mt-3 text-xs text-muted">
                Reference: <span className="font-mono font-semibold text-navy">{status.leadId.slice(0, 8).toUpperCase()}</span>
              </p>
              <button
                type="button"
                onClick={() => setStatus({ state: "idle", message: "", leadId: null })}
                className="btn-outline mt-6"
              >
                Send another enquiry
              </button>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Kashmir tour package enquiry form"
            >
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4">
                <FieldShell id={fid("fullName")} label="Full Name" required error={errors.fullName} className="col-span-2 sm:col-span-1">
                  <input
                    id={fid("fullName")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    maxLength={LIMITS.name}
                    className="field"
                    {...aria("fullName")}
                    {...register("fullName", rules.fullName)}
                  />
                </FieldShell>

                <FieldShell id={fid("mobile")} label="Mobile Number" required error={errors.mobile} className="col-span-2 sm:col-span-1">
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm font-medium text-muted">
                      +91
                    </span>
                    <input
                      id={fid("mobile")}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="10-digit mobile number"
                      maxLength={14}
                      className="field !pl-12"
                      {...aria("mobile")}
                      {...register("mobile", rules.mobile)}
                    />
                  </div>
                </FieldShell>

                <FieldShell id={fid("travelDate")} label="Travel Date" required error={errors.travelDate}>
                  <input
                    id={fid("travelDate")}
                    type="date"
                    min={todayISO()}
                    suppressHydrationWarning
                    className="field"
                    {...aria("travelDate")}
                    {...register("travelDate", rules.travelDate)}
                  />
                </FieldShell>

                <FieldShell id={fid("adults")} label="Travellers" required error={errors.adults}>
                  <select id={fid("adults")} className="field" {...aria("adults")} {...register("adults", rules.adults)}>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Traveller" : "Travellers"}
                      </option>
                    ))}
                    <option value="21">20+ Travellers</option>
                  </select>
                </FieldShell>

                <FieldShell id={fid("packageType")} label="Package Type" error={errors.packageType} className="col-span-2">
                  <select id={fid("packageType")} className="field" {...register("packageType")}>
                    <option value="">Select package</option>
                    {PACKAGE_TYPE_OPTIONS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </FieldShell>
              </div>

              {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={fid("company_website")}>Company website</label>
                <input id={fid("company_website")} type="text" tabIndex={-1} autoComplete="off" {...register("company_website")} />
              </div>

              <AnimatePresence>
                {status.state === "error" && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="mt-5 overflow-hidden rounded-xl border border-red-200 bg-red-50 p-4"
                  >
                    <p className="flex items-start gap-2 text-sm font-medium text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {status.message} Please try again, or send your details to us on WhatsApp.
                    </p>
                    <a
                      href={waFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn mt-3 bg-[#1FAF54] !py-2.5 text-white hover:bg-[#1a9a49]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Send enquiry on WhatsApp
                    </a>
                  </m.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full !py-3.5 text-[15px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending your enquiry…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Get My Free Kashmir Tour Quote
                  </>
                )}
              </button>

              <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[11.5px] leading-relaxed text-muted">
                <Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                <span>
                  Your details are used only to respond to your enquiry. See our{" "}
                  <a href="/privacy-policy" className="font-medium text-primary underline-offset-2 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </p>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
