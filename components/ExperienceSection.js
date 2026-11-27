"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionHeading from "./SectionHeading";
import { EXPERIENCES } from "@/lib/constants";

export default function ExperienceSection() {
  const [active, setActive] = useState(0);
  const current = EXPERIENCES[active];

  return (
    <section id="experiences" aria-labelledby="experiences-heading" data-location="experiences" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="experiences-heading"
          eyebrow="Things to do"
          title="Unforgettable Experiences in Kashmir"
          subtitle="From shikara rides on Dal Lake to snow days in Gulmarg — add the experiences you love to your itinerary."
        />

        <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          {/* Featured experience */}
          <ImagePlaceholder
            src={current.image}
            alt={`${current.title} in ${current.location}, Kashmir`}
            ratio={null}
            rounded="rounded-[22px]"
            tone="navy"
            sizes="(min-width: 1024px) 760px, 100vw"
            label={`experience-${current.slug}`}
            className="h-[360px] min-w-0 shadow-card sm:aspect-[16/9] sm:h-auto lg:aspect-auto lg:h-full lg:min-h-[420px]"
          >
            <div aria-live="polite" className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/95 via-navy-900/65 to-transparent p-5 pt-20 sm:p-7 sm:pt-24">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {current.location}
              </p>
              <h3 className="mt-1.5 text-xl font-bold !text-white sm:text-2xl">
                {current.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">{current.description}</p>
              <a
                href="#enquiry"
                data-package={current.title}
                data-package-type="Customized Kashmir Tour"
                data-message={`I'm interested in: ${current.title}`}
                className="btn-accent mt-4 !py-2.5"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </ImagePlaceholder>

          {/* Thumbnails */}
          <ul
            className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-2.5 lg:overflow-visible lg:px-0"
            aria-label="Choose an experience"
          >
            {EXPERIENCES.map((exp, i) => {
              const selected = i === active;
              return (
                <li key={exp.slug} className="w-[240px] shrink-0 snap-start lg:w-auto">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-200 ${
                      selected
                        ? "border-primary/30 bg-white shadow-card"
                        : "border-line bg-white/60 hover:border-primary/20 hover:bg-white"
                    }`}
                  >
                    <ImagePlaceholder
                      src={exp.image}
                      alt=""
                      ratio="4/3"
                      rounded="rounded-xl"
                      tone={selected ? "mint" : "navy"}
                      sizes="96px"
                      className="w-[84px] shrink-0"
                    />
                    <span className="min-w-0">
                      <span className={`block text-sm font-semibold ${selected ? "text-primary" : "text-navy"}`}>
                        {exp.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">{exp.location}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
