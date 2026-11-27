/**
 * Single source of truth for business details and page content.
 *
 * IMAGES: every `image` field is `null` by default, which renders a designed
 * placeholder. To add a photo, drop it in /public/images/... and set the path,
 * e.g. image: "/images/destinations/srinagar.jpg". No other code changes needed.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.magnatravels.com").replace(/\/$/, "");
export const LANDING_PATH = "/kashmir-tour-packages";
/** Official logo (square crop of the original artwork in /public/images/brand). */
export const LOGO_PATH = "/images/brand/magna-travels-logo.png";

export const BUSINESS = {
  name: "Magna Travels",
  contactPerson: "Sajid",
  phones: ["9797567990", "7006626696", "7006560155", "7006567613"],
  emails: ["info@magnatravels.com", "magnatravelskashmir@gmail.com", "Ladakhtraveltrips@gmail.com"],
  address: {
    street: "Kursoo, Padshahi Bagh",
    locality: "Srinagar",
    region: "Jammu & Kashmir",
    postalCode: "190008",
    country: "IN",
    countryName: "India",
  },
  addressLine: "Kursoo, Padshahi Bagh, Srinagar, Jammu & Kashmir, India – 190008",
  social: {
    instagram: "https://www.instagram.com/magna_travels_kashmir",
    facebook: "https://www.facebook.com/magnatravelskashmir",
  },
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919797567990",
};

export const PRIMARY_PHONE = BUSINESS.phones[0];

/** "9797567990" -> "tel:+919797567990" */
export const telHref = (phone) => `tel:+91${phone}`;
/** "9797567990" -> "+91 97975 67990" */
export const formatPhone = (phone) => `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

export function whatsappHref(message = "Hi Magna Travels, I would like to know more about your Kashmir tour packages.") {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Section anchors used by the navigation. */
export const NAV_LINKS = [
  { label: "Home", hash: "#top" },
  { label: "Kashmir Packages", hash: "#packages" },
  { label: "Destinations", hash: "#destinations" },
  { label: "Experiences", hash: "#experiences" },
  { label: "About Us", hash: "#about" },
  { label: "Contact", hash: "#enquiry" },
];

export const DESTINATION_OPTIONS = [
  "Srinagar",
  "Gulmarg",
  "Pahalgam",
  "Sonamarg",
  "Doodhpathri",
  "Gurez Valley",
  "Complete Kashmir Tour",
  "Kashmir + Ladakh",
  "Not sure yet",
];

export const TRIP_TYPES = ["Family Tour", "Honeymoon", "Group Tour", "Friends Trip", "Customized Tour"];

export const PACKAGE_TYPE_OPTIONS = [
  "Kashmir Family Tour Package",
  "Kashmir Honeymoon Package",
  "Kashmir Holiday Package",
  "Kashmir Weekend Getaway",
  "Kashmir Group Tour Package",
  "Kashmir Winter Snow Package",
  "Kashmir & Ladakh Combo Package",
  "Customized Kashmir Tour",
  "Friends Trip",
  "Ladakh Tour",
];

/** Maps the quick-search "Trip Type" to the enquiry form's "Package Type". */
export const TRIP_TYPE_TO_PACKAGE = {
  "Family Tour": "Kashmir Family Tour Package",
  Honeymoon: "Kashmir Honeymoon Package",
  "Group Tour": "Kashmir Group Tour Package",
  "Friends Trip": "Friends Trip",
  "Customized Tour": "Customized Kashmir Tour",
};

export const DAYS_OPTIONS = ["3 Days", "4 Days", "5 Days", "6 Days", "7 Days", "8 Days", "9+ Days", "Not decided"];

export const DESTINATIONS = [
  {
    slug: "srinagar",
    name: "Srinagar",
    tagline: "Dal Lake & Mughal Gardens",
    description:
      "Experience the beauty of Dal Lake, Mughal Gardens, houseboats and traditional Kashmiri hospitality.",
    image: "/images/destinations/srinagar.png",
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    tagline: "Meadows & Gondola",
    description: "Discover snow-covered mountains, scenic meadows and the famous Gondola experience.",
    image: "/images/destinations/gulmarg.png",
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    tagline: "Valley of Shepherds",
    description: "Explore beautiful valleys, rivers, pine forests and breathtaking mountain landscapes.",
    image: "/images/destinations/pahalgam.png",
  },
  {
    slug: "sonamarg",
    name: "Sonamarg",
    tagline: "Meadow of Gold",
    description: "Experience stunning alpine scenery, glaciers and magnificent Himalayan views.",
    image: "/images/destinations/sonamarg.png",
  },
  {
    slug: "doodhpathri",
    name: "Doodhpathri",
    tagline: "Valley of Milk",
    description: "Discover peaceful green meadows, flowing streams and natural beauty.",
    image: "/images/destinations/doodhpathri.png",
  },
  {
    slug: "gurez-valley",
    name: "Gurez Valley",
    tagline: "Offbeat Kashmir",
    description: "Explore an offbeat Kashmir destination known for its spectacular mountain scenery.",
    image: null,
  },
];

/**
 * ⚠ PRICES ARE SAMPLES. Replace every `price` with your real "starting from" price
 * per person before running Google Ads. Use null to show "Price on request".
 */
export const PACKAGES = [
  {
    slug: "kashmir-family-tour-package",
    name: "Kashmir Family Tour Package",
    duration: "5 Nights / 6 Days",
    route: "Srinagar – Gulmarg – Pahalgam – Srinagar",
    description: "Enjoy a memorable family holiday exploring Kashmir's famous destinations.",
    badge: "Family",
    days: "6 Days",
    price: "14,999", // ⚠ SAMPLE
    image: "/images/packages/family-tour.png",
  },
  {
    slug: "kashmir-honeymoon-package",
    name: "Kashmir Honeymoon Package",
    duration: "5 Nights / 6 Days",
    route: "Srinagar – Gulmarg – Pahalgam",
    description:
      "Experience a romantic Kashmir getaway with beautiful mountain views and peaceful surroundings.",
    badge: "Honeymoon",
    days: "6 Days",
    price: "17,999", // ⚠ SAMPLE
    image: "/images/packages/honeymoon.png",
  },
  {
    slug: "kashmir-holiday-package",
    name: "Kashmir Holiday Package",
    duration: "6 Nights / 7 Days",
    route: "Srinagar – Sonamarg – Gulmarg – Pahalgam",
    description: "Explore Kashmir's most popular destinations in one memorable holiday.",
    badge: "Holiday",
    days: "7 Days",
    price: "19,999", // ⚠ SAMPLE
    image: "/images/packages/holiday.png",
  },
  {
    slug: "kashmir-weekend-getaway",
    name: "Kashmir Weekend Getaway",
    duration: "3 Nights / 4 Days",
    route: "Srinagar – Gulmarg – Srinagar",
    description: "A short Kashmir break with Dal Lake, a shikara ride and a day in the meadows of Gulmarg.",
    badge: "Short Trip",
    days: "4 Days",
    price: "9,999", // ⚠ SAMPLE
    image: "/images/packages/weekend-getaway.png",
  },
  {
    slug: "kashmir-group-tour-package",
    name: "Kashmir Group Tour Package",
    duration: "5 Nights / 6 Days",
    route: "Srinagar – Gulmarg – Pahalgam – Srinagar",
    description: "A well-planned Kashmir trip for friends, colleagues and large groups travelling together.",
    badge: "Group",
    days: "6 Days",
    price: "13,999", // ⚠ SAMPLE
    image: "/images/packages/group-tour.png",
  },
  {
    slug: "kashmir-winter-snow-package",
    name: "Kashmir Winter Snow Package",
    duration: "4 Nights / 5 Days",
    route: "Srinagar – Gulmarg – Sonamarg",
    description: "Enjoy snowfall, snow activities and winter views across Gulmarg and Sonamarg.",
    badge: "Winter",
    days: "5 Days",
    price: "15,999", // ⚠ SAMPLE
    image: "/images/packages/winter-snow.png",
  },
  {
    slug: "kashmir-ladakh-combo-package",
    name: "Kashmir & Ladakh Combo Package",
    duration: "8 Nights / 9 Days",
    route: "Srinagar – Sonamarg – Kargil – Leh",
    description: "Combine the valleys of Kashmir with the high mountain landscapes of Ladakh in one journey.",
    badge: "Kashmir + Ladakh",
    days: "9+ Days",
    price: "34,999", // ⚠ SAMPLE
    image: "/images/packages/kashmir-ladakh.png",
  },
  {
    slug: "customized-kashmir-tour",
    name: "Customized Kashmir Tour",
    duration: "Customizable",
    route: "Based on traveller preference",
    description:
      "Create a personalized Kashmir holiday based on your travel dates, budget and interests.",
    badge: "Tailor-made",
    days: "Not decided",
    price: null, // null shows "Price on request"
    image: "/images/packages/customized-tour.png",
  },
];

export const EXPERIENCES = [
  {
    slug: "dal-lake-shikara-ride",
    title: "Dal Lake Shikara Ride",
    location: "Srinagar",
    description:
      "Glide across the calm waters of Dal Lake in a traditional shikara, passing floating gardens and lakeside markets.",
    image: "/images/destinations/srinagar.png",
  },
  {
    slug: "kashmir-houseboat-stay",
    title: "Kashmir Houseboat Stay",
    location: "Srinagar",
    description:
      "Spend a night aboard a hand-carved cedar houseboat and wake up to quiet lake views and Kashmiri kahwa.",
    image: null,
  },
  {
    slug: "gulmarg-gondola-ride",
    title: "Gulmarg Gondola Ride",
    location: "Gulmarg",
    description:
      "Ride the Gulmarg Gondola up towards Kongdori and Apharwat for sweeping views of the Himalayan ranges.",
    image: "/images/experiences/gulmarg-gondola.png",
  },
  {
    slug: "snow-activities",
    title: "Snow Activities",
    location: "Gulmarg & Sonamarg",
    description:
      "Enjoy skiing, sledging and snow play on the winter slopes of Gulmarg and Sonamarg.",
    image: "/images/packages/winter-snow.png",
  },
  {
    slug: "mughal-gardens",
    title: "Mughal Gardens",
    location: "Srinagar",
    description:
      "Walk through the terraced lawns, fountains and chinar trees of Nishat, Shalimar and Chashme Shahi.",
    image: null,
  },
  {
    slug: "pahalgam-valley-exploration",
    title: "Pahalgam Valley Exploration",
    location: "Pahalgam",
    description:
      "Discover Betaab Valley, Aru Valley and the Lidder River surrounded by pine forests and meadows.",
    image: "/images/destinations/pahalgam.png",
  },
];

export const FEATURES = [
  {
    icon: "Compass",
    title: "Personalized Travel Planning",
    description: "Travel experiences designed around your preferences.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Customized Tour Packages",
    description: "Flexible itineraries for families, couples and groups.",
  },
  {
    icon: "MapPinned",
    title: "Local Destination Knowledge",
    description: "Discover Kashmir with destination-focused travel planning.",
  },
  {
    icon: "Headset",
    title: "Dedicated Travel Assistance",
    description: "Assistance throughout your travel planning and booking process.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Share Your Travel Requirements",
    description: "Tell us your travel dates, group size and preferences.",
  },
  {
    title: "Get Your Customized Itinerary",
    description: "Receive a travel plan based on your requirements.",
  },
  {
    title: "Confirm Your Booking",
    description: "Discuss your package and confirm your travel arrangements.",
  },
  {
    title: "Enjoy Your Kashmir Holiday",
    description: "Get ready to explore the beautiful destinations of Kashmir.",
  },
];

export const FAQS = [
  {
    question: "What is the best time to visit Kashmir?",
    answer:
      "Kashmir can be visited all year round, and the best time depends on what you want to experience. March to June brings pleasant weather, blooming gardens and green meadows, which suits sightseeing and family holidays. July to September is ideal for exploring Sonamarg, Gurez and higher valleys. October and November offer golden autumn colours, while December to February is the best time for snowfall and snow activities in Gulmarg.",
  },
  {
    question: "How many days are enough for a Kashmir trip?",
    answer:
      "A 5 nights / 6 days itinerary is enough to cover Srinagar, Gulmarg and Pahalgam comfortably. If you would also like to include Sonamarg or Doodhpathri, plan for 6 to 7 days. Offbeat places such as Gurez Valley usually need one or two extra days because of the longer drive.",
  },
  {
    question: "What are the best places to visit in Kashmir?",
    answer:
      "Popular places include Srinagar for Dal Lake, houseboats and the Mughal Gardens; Gulmarg for meadows, snow and the Gondola ride; Pahalgam for Betaab and Aru valleys; and Sonamarg for glaciers and alpine scenery. Doodhpathri and Gurez Valley are quieter options for travellers who want to explore beyond the usual route.",
  },
  {
    question: "Are Kashmir tour packages available for families?",
    answer:
      "Yes. Our Kashmir family tour packages are planned with comfortable travel times, family-friendly hotels and sightseeing that suits children and senior travellers. You can share the number of adults and children, and we will plan the itinerary around your family's pace.",
  },
  {
    question: "Can I book a customized Kashmir honeymoon package?",
    answer:
      "Yes. Kashmir honeymoon packages can be customized with your choice of hotels, a houseboat stay on Dal Lake, a shikara ride and a relaxed itinerary across Srinagar, Gulmarg and Pahalgam. Share your travel dates and preferences, and we will prepare a plan for you.",
  },
  {
    question: "Is Gulmarg included in Kashmir tour packages?",
    answer:
      "Gulmarg is included in most of our Kashmir tour packages, including the family, honeymoon and holiday packages. It is usually covered as a day excursion or an overnight stay from Srinagar, and the Gulmarg Gondola ride can be planned as part of your visit.",
  },
  {
    question: "Can I customize my Kashmir travel itinerary?",
    answer:
      "Yes. Every itinerary can be adjusted to your travel dates, number of days, budget, hotel category and the places you would like to visit. You can also combine Kashmir with Ladakh or add offbeat destinations such as Gurez Valley.",
  },
  {
    question: "How can I get a Kashmir tour package quotation?",
    answer:
      "Fill in the enquiry form on this page, call us or send us a message on WhatsApp with your travel dates, number of travellers and preferred destinations. Our team will contact you with a customized itinerary and a quotation for your Kashmir trip.",
  },
];
