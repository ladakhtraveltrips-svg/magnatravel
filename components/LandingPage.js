import Header from "./Header";
import HeroSection from "./HeroSection";
import DestinationSection from "./DestinationSection";
import PackageSection from "./PackageSection";
import ExperienceSection from "./ExperienceSection";
import WhyChooseUs from "./WhyChooseUs";
import OfferSection from "./OfferSection";
import TravelProcess from "./TravelProcess";
import EnquirySection from "./EnquirySection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";
import EnquiryPopup from "./EnquiryPopup";
import { landingJsonLd, serializeJsonLd } from "@/lib/seo";

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(landingJsonLd()) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-card"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <HeroSection />
        <PackageSection />
        <DestinationSection />
        <ExperienceSection />
        <WhyChooseUs />
        <OfferSection />
        <TravelProcess />
        <EnquirySection />
        <FAQSection />
      </main>
      <div className="pb-[76px] md:pb-0 bg-navy-900">
        <Footer />
      </div>
      <FloatingCTA />
      <EnquiryPopup />
    </>
  );
}
