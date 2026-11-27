import { BUSINESS, FAQS, LANDING_PATH, LOGO_PATH, SITE_URL } from "./constants";

export const SEO = {
  title: "Kashmir Tour Packages | Family & Honeymoon Trips – Magna Travels",
  description:
    "Explore Kashmir tour packages with Magna Travels. Discover Srinagar, Gulmarg, Pahalgam and Sonamarg with customized family and honeymoon holiday itineraries.",
  /**
   * Optional social sharing image (1200x630). Add a file to /public/images and set
   * e.g. "/images/og-kashmir-tour-packages.jpg". Left null so no image is referenced.
   */
  ogImage: null,
};

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Metadata for the Kashmir tour packages landing page (used by / and /kashmir-tour-packages). */
export function landingMetadata() {
  const url = absoluteUrl(LANDING_PATH);
  // Uses the dedicated 1200x630 share image when set, otherwise falls back to the square logo.
  const images = SEO.ogImage
    ? [{ url: SEO.ogImage, width: 1200, height: 630, alt: "Kashmir tour packages by Magna Travels" }]
    : [{ url: LOGO_PATH, width: 512, height: 512, alt: "Magna Travels logo" }];

  return {
    title: { absolute: SEO.title },
    description: SEO.description,
    alternates: { canonical: LANDING_PATH },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: BUSINESS.name,
      title: SEO.title,
      description: SEO.description,
      images,
    },
    twitter: {
      card: SEO.ogImage ? "summary_large_image" : "summary",
      title: SEO.title,
      description: SEO.description,
      images: [images[0].url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

/** JSON-LD graph: TravelAgency, Organization, WebSite, WebPage, BreadcrumbList, FAQPage. */
export function landingJsonLd() {
  const pageUrl = absoluteUrl(LANDING_PATH);
  const orgId = `${SITE_URL}/#organization`;
  const agencyId = `${SITE_URL}/#travelagency`;
  const websiteId = `${SITE_URL}/#website`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  };
  const telephones = BUSINESS.phones.map((p) => `+91-${p}`);
  const sameAs = [BUSINESS.social.instagram, BUSINESS.social.facebook];
  const logo = { "@type": "ImageObject", url: absoluteUrl(LOGO_PATH), width: 512, height: 512 };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: BUSINESS.name,
        url: SITE_URL,
        logo,
        image: logo.url,
        email: BUSINESS.emails[0],
        telephone: telephones[0],
        address,
        sameAs,
        contactPoint: telephones.map((telephone) => ({
          "@type": "ContactPoint",
          telephone,
          contactType: "customer service",
          areaServed: "IN",
        })),
      },
      {
        "@type": "TravelAgency",
        "@id": agencyId,
        name: BUSINESS.name,
        url: pageUrl,
        logo,
        image: logo.url,
        description: SEO.description,
        telephone: telephones,
        email: BUSINESS.emails.slice(0, 2),
        address,
        areaServed: [
          { "@type": "State", name: "Jammu and Kashmir" },
          { "@type": "Place", name: "Ladakh" },
        ],
        parentOrganization: { "@id": orgId },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: SEO.title,
        description: SEO.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": agencyId },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Kashmir Tour Packages", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/** Breadcrumb JSON-LD for simple inner pages (privacy, terms). */
export function breadcrumbJsonLd(name, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

/** Safely serialise JSON-LD for a <script> tag (prevents `</script>` injection). */
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
