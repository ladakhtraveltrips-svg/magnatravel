import { ChevronRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { LANDING_PATH } from "@/lib/constants";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

export default function LegalPage({ title, path, updated, children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(title, path)) }} />
      <Header linkPrefix={LANDING_PATH} />
      <main id="main" className="section-y">
        <div className="container-x max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-muted">
              <li>
                <a href={LANDING_PATH} className="hover:text-primary">
                  Home
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li aria-current="page" className="font-medium text-ink/80">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
          <div className="card mt-8 space-y-6 p-6 text-[15px] leading-relaxed text-ink/80 sm:p-8 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline">
            {children}
          </div>
        </div>
      </main>
      <Footer linkPrefix={LANDING_PATH} />
    </>
  );
}
