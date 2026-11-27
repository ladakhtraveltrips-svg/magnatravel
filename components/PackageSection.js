import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionHeading from "./SectionHeading";
import { PACKAGES } from "@/lib/constants";

export default function PackageSection() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      data-location="packages"
      className="section-y border-y border-mint-200 bg-gradient-to-b from-mint via-mint/60 to-canvas"
    >
      <div className="container-x">
        <SectionHeading
          id="packages-heading"
          eyebrow="Kashmir Holiday Packages"
          title="Popular Kashmir Tour Packages"
          subtitle="Find the perfect Kashmir holiday for your next journey."
          action={
            <a
              href="#enquiry"
              data-package="All Kashmir Packages"
              data-package-type="Kashmir Holiday Package"
              className="btn-outline"
            >
              View All Kashmir Packages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          }
        />

        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p) => (
            <li key={p.slug} id={p.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#CFE0D9] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-float">
                <ImagePlaceholder
                  src={p.image}
                  alt={`${p.name} – ${p.route}`}
                  ratio="16/10"
                  rounded="rounded-none"
                  tone={p.slug === "kashmir-honeymoon-package" ? "sand" : "mint"}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  label={p.slug}
                  className="[&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.05]"
                >
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                    {p.badge}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-semibold text-navy shadow-sm">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    {p.duration}
                  </span>
                </ImagePlaceholder>

                <div className="flex flex-1 flex-col px-4 pt-3.5">
                  <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-ink/80">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden="true" />
                    <span className="leading-snug">{p.route}</span>
                  </p>
                  <p className="mb-3.5 mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{p.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#DCE9E4] bg-mint/60 px-4 py-3">
                  <div className="flex min-h-[42px] flex-col justify-center leading-tight">
                    {p.price ? (
                      <>
                        <span className="block text-[11px] font-medium text-muted">Starting from</span>
                        <span className="mt-0.5 block">
                          <span className="font-display text-xl font-extrabold text-primary">₹{p.price}</span>
                          <span className="text-xs text-muted"> / person</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block text-[11px] font-medium text-muted">Your budget</span>
                        <span className="mt-0.5 block font-display text-base font-extrabold text-primary">
                          Price on request
                        </span>
                      </>
                    )}
                  </div>
                  <a
                    href="#enquiry"
                    data-package={p.name}
                    data-days={p.days}
                    className="btn-primary !px-4 !py-2 text-[13px]"
                    aria-label={`Enquire about the ${p.name}`}
                  >
                    Enquire
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
