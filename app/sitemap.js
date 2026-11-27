import { LANDING_PATH, SITE_URL } from "@/lib/constants";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}${LANDING_PATH}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
