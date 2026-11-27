import Image from "next/image";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

/** Main hero photo (right side). */
const HERO_IMAGE = "/images/hero/kashmir-shikara-sunrise.png";
/** Soft background photo behind the whole hero card. */
const HERO_BG_IMAGE = "/images/hero/kashmir-winter-gondola-valley.png";

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      data-location="hero"
      className="relative isolate overflow-hidden pb-8 pt-4 sm:pb-10 sm:pt-6"
    >
      {/* Full-width background photo behind the whole hero (edge to edge) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={HERO_BG_IMAGE}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/70" />
      </div>

      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] border border-white/60 shadow-float">
          {/* Phones: shikara photo inside the card with a dark shade and white text */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 sm:hidden">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              sizes="(min-width: 640px) 1px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/75" />
          </div>
          {/* Tablet & desktop: frosted white layer over the background photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-white/85 backdrop-blur-[2px] sm:block lg:bg-transparent lg:bg-gradient-to-r lg:from-white/95 lg:via-white/85 lg:to-white/35"
          />
          <div className="relative grid items-center gap-8 p-5 sm:p-8 sm:pb-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:p-12 lg:pb-16">
            <div className="max-sm:[text-shadow:0_1px_10px_rgba(7,26,51,0.6)]">
              <nav aria-label="Breadcrumb" className="mb-4 hidden sm:block">
                <ol className="flex items-center gap-1 text-xs text-muted">
                  <li>
                    <a href="/" className="hover:text-primary">
                      Home
                    </a>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3 w-3" />
                  </li>
                  <li aria-current="page" className="font-medium text-ink/80">
                    Kashmir Tour Packages
                  </li>
                </ol>
              </nav>

              <p className="eyebrow max-sm:!text-accent">Explore the beauty of Kashmir</p>
              <h1
                id="hero-heading"
                className="mt-2.5 text-[25px] font-bold leading-[1.15] max-sm:!text-white sm:mt-3 sm:text-[40px] sm:leading-[1.12] lg:text-[44px]"
              >
                Discover <span className="text-primary max-sm:text-accent">Kashmir Tour Packages</span> for an
                Unforgettable Holiday
              </h1>
              {/* Short copy on phones, full copy from tablet up */}
              <p className="mt-3 text-[14px] leading-relaxed text-white/85 sm:hidden">
                Explore Dal Lake, the snowy peaks of Gulmarg and the valleys of Pahalgam with customized Kashmir holidays
                by Magna Travels.
              </p>
              <p className="mt-4 hidden max-w-xl text-base leading-relaxed text-ink/75 sm:block">
                Explore the breathtaking beauty of Kashmir with Magna Travels. From the peaceful Dal Lake and beautiful
                Srinagar to the snow-covered mountains of Gulmarg and the scenic valleys of Pahalgam, discover memorable
                Kashmir holidays with customized travel experiences.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 [text-shadow:none] sm:mt-6 sm:flex sm:gap-3">
                <a
                  href="#packages"
                  className="btn-primary !px-3 text-[13px] max-sm:!bg-accent max-sm:!text-navy-900 sm:!px-5 sm:text-sm"
                >
                  <span className="sm:hidden">View Packages</span>
                  <span className="hidden sm:inline">Explore Kashmir Packages</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#enquiry" className="btn-outline !px-3 text-[13px] sm:!px-5 sm:text-sm">
                  <span className="sm:hidden">Free Quote</span>
                  <span className="hidden sm:inline">Get Free Travel Quote</span>
                </a>
              </div>
            </div>

            {/* Hero photo: hidden on phones (the background photo already shows Kashmir) */}
            <div className="relative hidden sm:block">
              <ImagePlaceholder
                src={HERO_IMAGE}
                alt="Shikara on a Kashmir lake at sunrise with snow-covered mountains"
                ratio="16/9"
                rounded="rounded-[22px]"
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 100vw, 1px"
                priority
                label="hero"
                className="shadow-card ring-1 ring-black/5"
              />
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:left-6">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-navy">Srinagar · Gulmarg · Pahalgam</span>
                  <span className="block text-[11.5px] text-muted">Sonamarg, Doodhpathri & Gurez</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
