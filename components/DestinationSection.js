import { ArrowUpRight, MapPin } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";
import SectionHeading from "./SectionHeading";
import { DESTINATIONS } from "@/lib/constants";

export default function DestinationSection() {
  return (
    <section id="destinations" aria-labelledby="destinations-heading" data-location="destinations" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="destinations-heading"
          eyebrow="Popular Destinations"
          title="Explore Kashmir's Most Beautiful Destinations"
          
          action={
            <a href="#enquiry" className="btn-outline">
              Plan a Custom Route
            </a>
          }
        />

        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <li key={d.slug} id={`destination-${d.slug}`} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <article className="group h-full overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 hover:shadow-card">
                <ImagePlaceholder
                  src={d.image}
                  alt={`${d.name}, Kashmir`}
                  ratio="3/4"
                  rounded="rounded-2xl"
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw"
                  label={d.slug}
                  className="h-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.04]"
                >
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {d.tagline}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/95 via-navy-900/70 to-transparent p-5 pt-28">
                    <h3 className="text-xl font-bold !text-white">{d.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">{d.description}</p>
                    <a
                      href="#enquiry"
                      data-package={`${d.name} Tour`}
                      data-package-type="Customized Kashmir Tour"
                      data-destination={d.name}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                      aria-label={`Explore ${d.name} – enquire about ${d.name} tour packages`}
                    >
                      Explore Destination
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </ImagePlaceholder>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
