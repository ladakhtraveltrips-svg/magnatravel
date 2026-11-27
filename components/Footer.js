import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { BUSINESS, DESTINATIONS, LANDING_PATH, formatPhone, telHref } from "@/lib/constants";

export default function Footer({ linkPrefix = "" }) {
  const href = (hash) => `${linkPrefix}${hash}`;
  const quickLinks = [
    { label: "Home", href: href("#top") },
    { label: "Kashmir Tour Packages", href: href("#packages") },
    { label: "Destinations", href: href("#destinations") },
    { label: "Experiences", href: href("#experiences") },
    { label: "About Us", href: href("#about") },
    { label: "Contact Us", href: href("#enquiry") },
  ];
  const year = new Date().getFullYear();

  return (
    <footer data-location="footer" className="bg-navy-900 text-white/70">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.3fr] lg:gap-8">
        <div>
          <Link href={LANDING_PATH} aria-label="Magna Travels home">
            <Logo light size={52} />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Discover the beauty of Kashmir with personalized holiday packages, destination experiences and customized
            travel planning.
          </p>
          <div className="mt-5 flex gap-2.5">
            <a
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Magna Travels on Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramIcon />
            </a>
            <a
              href={BUSINESS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Magna Travels on Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-sm font-semibold !text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular destinations">
          <h2 className="text-sm font-semibold !text-white">Popular Destinations</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {DESTINATIONS.map((d) => (
              <li key={d.slug}>
                <a href={href(`#destination-${d.slug}`)} className="transition-colors hover:text-accent">
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold !text-white">Contact Information</h2>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="grid grid-cols-2 gap-x-4 gap-y-1">
                {BUSINESS.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="whitespace-nowrap transition-colors hover:text-accent">
                    {formatPhone(p)}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex min-w-0 flex-col gap-1">
                {BUSINESS.emails.slice(0, 2).map((e) => (
                  <a key={e} href={`mailto:${e}`} className="break-all transition-colors hover:text-accent">
                    {e}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <address className="not-italic leading-relaxed">{BUSINESS.addressLine}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy-policy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
