"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, PRIMARY_PHONE, formatPhone, telHref } from "@/lib/constants";

/**
 * @param {string} linkPrefix "" on the landing page (pure #hash links),
 *                            "/kashmir-tour-packages" on inner pages.
 */
export default function Header({ linkPrefix = "" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (hash) => `${linkPrefix}${hash}`;

  return (
    <header
      data-location="header"
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-white/90 backdrop-blur-md" : "border-transparent bg-canvas/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={href("#top")} aria-label="Magna Travels – Kashmir Tour Packages" className="shrink-0">
          <Logo priority />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.hash}>
                <a
                  href={href(l.hash)}
                  className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink/80 transition-colors hover:bg-mint hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={telHref(PRIMARY_PHONE)} className="btn-outline hidden !px-4 !py-2.5 md:inline-flex">
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="hidden xl:inline">{formatPhone(PRIMARY_PHONE)}</span>
            <span className="xl:hidden">Call Now</span>
          </a>
          <a href={href("#enquiry")} className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex">
            Get Free Quote
          </a>
          <a
            href={telHref(PRIMARY_PHONE)}
            aria-label={`Call Magna Travels on ${formatPhone(PRIMARY_PHONE)}`}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-primary md:hidden"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <ul className="container-x grid gap-1 py-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.hash}>
                    <a
                      href={href(l.hash)}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-[15px] font-medium text-navy hover:bg-mint"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a href={href("#enquiry")} data-popup="1" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Get Free Quote
                  </a>
                </li>
              </ul>
            </m.nav>
          )}
        </AnimatePresence>
      </LazyMotion>
    </header>
  );
}
