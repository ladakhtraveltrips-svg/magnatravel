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
      className="section-y border-y border-line bg-white"
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
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-card">
                <ImagePlaceholder
                  src={p.image}
                  alt={`${p.name} – ${p.route}`}
                  ratio="16/10"
                  rounded="rounded-none"
                  tone={p.slug === "kashmir-honeymoon-package" ? "sand" : "mint"}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  label={p.slug}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm">
                    {p.badge}
                  </span>
                </ImagePlaceholder>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-bold leading-snug">{p.name}</h3>

                  <ul className="mt-2 space-y-1 text-[13px] text-ink/75">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                      {p.duration}
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="leading-snug">{p.route}</span>
                    </li>
                  </ul>

                  <p className="mb-3 mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{p.description}</p>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3">
                    <div className="flex min-h-[46px] flex-col justify-end leading-tight">
                      {p.price ? (
                        <>
                          <span className="block text-[11px] font-medium text-muted">Starting from</span>
                          <span className="mt-0.5 block">
                            <span className="font-display text-xl font-bold text-navy">₹{p.price}</span>
                            <span className="text-xs text-muted"> / person</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="block text-[11px] font-medium text-muted">Your budget</span>
                          <span className="mt-0.5 block font-display text-base font-bold text-navy">Price on request</span>
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
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
