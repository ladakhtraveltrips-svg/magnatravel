import { ArrowRight, Phone } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import { PRIMARY_PHONE, telHref } from "@/lib/constants";

/** Set to "/images/offer/kashmir-offer.jpg" once uploaded. */
const OFFER_IMAGE = "/images/hero/kashmir-winter-gondola-valley.png";

export default function OfferSection() {
  return (
    <section aria-labelledby="offer-heading" data-location="offer_banner" className="section-y">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-primary">
          <div aria-hidden="true" className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-white/5" />
          <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-2xl" />

          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12">
            <div>
              <p className="eyebrow !text-accent">Customized Kashmir Holidays</p>
              <h2 id="offer-heading" className="mt-3 text-[26px] font-bold leading-tight !text-white sm:text-[34px]">
                Your Dream Kashmir Holiday Starts Here!
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75">
                Planning a family holiday, romantic getaway or unforgettable Kashmir trip? Connect with Magna Travels and
                get a customized travel itinerary for your journey.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#enquiry" className="btn-accent">
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={telHref(PRIMARY_PHONE)} className="btn-ghost-light">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Talk to Our Travel Expert
                </a>
              </div>
            </div>

            <ImagePlaceholder
              src={OFFER_IMAGE}
              alt="Gondolas over a snow-covered Kashmir valley in winter"
              ratio="4/3"
              tone="dark"
              rounded="rounded-[22px]"
              sizes="(min-width: 1024px) 520px, 100vw"
              label="offer"
              className="ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
