import { CalendarCheck, ClipboardList, MessageSquareText, Mountain } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

const ICONS = [MessageSquareText, ClipboardList, CalendarCheck, Mountain];

export default function TravelProcess() {
  return (
    <section aria-labelledby="process-heading" className="section-y border-y border-line bg-white">
      <div className="container-x">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="Plan Your Kashmir Trip in 4 Simple Steps"
          align="center"
        />

        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden border-t-2 border-dashed border-mint-200 lg:block"
          />
          {PROCESS_STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-white bg-mint text-primary ring-1 ring-mint-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-navy-900">
                    {i + 1}
                  </span>
                </span>
                <div className="lg:mt-4">
                  <h3 className="text-[15px] font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted lg:mx-auto lg:max-w-[230px]">{s.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
