import LandingPage from "@/components/LandingPage";
import { landingMetadata } from "@/lib/seo";

/**
 * The root URL renders the same landing page, with its canonical URL pointing to
 * /kashmir-tour-packages so search engines index a single version.
 */
export const metadata = landingMetadata();

export default function HomePage() {
  return <LandingPage />;
}
