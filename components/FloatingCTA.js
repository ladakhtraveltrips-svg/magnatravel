import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { PRIMARY_PHONE, formatPhone, telHref, whatsappHref } from "@/lib/constants";

/** Mobile sticky bottom bar (Call + WhatsApp) and a small desktop WhatsApp button. */
export default function FloatingCTA() {
  return (
    <>
      <div
        data-location="sticky_bar"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-8px_24px_-12px_rgba(11,37,69,0.25)] backdrop-blur md:hidden"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <a href={telHref(PRIMARY_PHONE)} className="btn-primary !py-3" aria-label={`Call ${formatPhone(PRIMARY_PHONE)}`}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn !py-3 bg-[#1FAF54] text-white active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
        </div>
      </div>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        data-location="floating_whatsapp"
        aria-label="Chat with Magna Travels on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#1FAF54] text-white shadow-float transition-transform hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
