import { Mail, MapPin, Phone } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { WhatsAppIcon } from "./SocialIcons";
import { BUSINESS, formatPhone, telHref, whatsappHref } from "@/lib/constants";

export default function EnquirySection() {
  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      data-location="enquiry_section"
      className="section-y relative bg-gradient-to-b from-mint/70 to-canvas"
    >
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        <div className="lg:pt-4">
          <p className="eyebrow">Free Kashmir Tour Quote</p>
          <h2 id="enquiry-heading" className="mt-2.5 text-[26px] font-bold leading-tight sm:text-[32px]">
            Get Your Customized Kashmir Tour Package
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Share your travel details and our team will connect with you.
          </p>

          <div className="mt-7 space-y-3">
            <div className="card flex items-start gap-3.5 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-primary">
                <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Call {BUSINESS.contactPerson}</p>
                <ul className="mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 min-[400px]:grid-cols-2">
                  {BUSINESS.phones.map((p) => (
                    <li key={p}>
                      <a href={telHref(p)} className="text-[15px] font-semibold text-navy hover:text-primary">
                        {formatPhone(p)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card flex items-start gap-3.5 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-primary">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                <ul className="mt-1 space-y-0.5">
                  {BUSINESS.emails.slice(0, 2).map((e) => (
                    <li key={e}>
                      <a href={`mailto:${e}`} className="break-all text-[15px] font-semibold text-navy hover:text-primary">
                        {e}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card flex items-start gap-3.5 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-primary">
                <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Office</p>
                <address className="mt-1 text-[14.5px] not-italic leading-relaxed text-navy">{BUSINESS.addressLine}</address>
              </div>
            </div>
          </div>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-5 w-full bg-[#1FAF54] text-white hover:bg-[#1a9a49] sm:w-auto"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Chat on WhatsApp
          </a>
        </div>

        <EnquiryForm />
      </div>
    </section>
  );
}
