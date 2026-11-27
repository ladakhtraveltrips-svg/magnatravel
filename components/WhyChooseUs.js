import { Compass, Headset, MapPinned, SlidersHorizontal } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { FEATURES } from "@/lib/constants";

const ICONS = { Compass, Headset, MapPinned, SlidersHorizontal };

export default function WhyChooseUs() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y bg-mint/60">
      <div className="container-x">
        <SectionHeading
          id="about-heading"
          eyebrow="About Magna Travels"
          title="Why Plan Your Kashmir Holiday With Magna Travels?"
          subtitle="Magna Travels is a Srinagar-based travel company planning Kashmir and Ladakh holidays for families, couples and groups."
          align="center"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <li key={f.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
