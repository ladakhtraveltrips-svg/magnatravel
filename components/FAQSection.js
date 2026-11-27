import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { FAQS } from "@/lib/constants";

/**
 * Native <details>/<summary> accordion: keyboard and screen-reader accessible,
 * zero JavaScript, and the answers stay in the HTML for search engines.
 */
export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y">
      <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Frequently Asked Questions About Kashmir Tour Packages"
            subtitle="Quick answers to help you plan your Kashmir holiday. Can't find what you're looking for? Get in touch with our team."
          />
          <a href="#enquiry" className="btn-primary -mt-2 hidden lg:inline-flex">
            Ask Us a Question
          </a>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={f.question}
              name="kashmir-faq"
              open={i === 0}
              className="group card overflow-hidden transition-shadow open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[15px] font-semibold leading-snug text-navy">{f.question}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint text-primary transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
