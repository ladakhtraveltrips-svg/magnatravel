# Magna Travels – Kashmir Tour Packages Landing Page

Next.js 16 (App Router) · React 19 · JavaScript · Tailwind CSS v4 · Lucide · Framer Motion · React Hook Form

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000/kashmir-tour-packages
npm run build && npm start   # production
```

`/kashmir-tour-packages` is the canonical landing page (use it as the Google Ads final URL).
`/` renders the same page with its canonical pointing to `/kashmir-tour-packages`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, used for canonical URLs, sitemap, Open Graph and JSON-LD |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (`GTM-XXXXXXX`). Nothing loads when empty |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` / `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Optional direct Google Ads lead conversion. Skip these if you set up conversions in GTM |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format, no `+` (default `919797567990`) |
| `SMTP_USER` / `SMTP_PASS` | **Email delivery of every enquiry.** For Gmail use the address plus a 16-character App Password (Google Account → Security → 2-Step Verification → App passwords) |
| `SMTP_HOST` / `SMTP_PORT` | Defaults to `smtp.gmail.com` / `465`. Change these for Hostinger, Zoho, cPanel and similar providers |
| `ENQUIRY_TO_EMAIL` | Comma-separated inboxes that receive the enquiry emails (defaults to all three business emails) |
| `ENQUIRY_WEBHOOK_URL` | Optional extra delivery: the URL that leads are POSTed to as JSON (CRM, Zapier/Make, Google Apps Script, etc.) |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional bearer token sent to the webhook |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | Optional: post the form somewhere other than `/api/enquiry` |

An enquiry counts as received when at least one channel (email or webhook) accepts it. If neither is configured the API returns 503, and if every channel fails it returns 502. In both cases the form shows an error with a WhatsApp fallback. It never shows a fake success.

## Adding images

All image slots use `components/ImagePlaceholder.js`. Put the photos in `public/images/...` and set the path:

| Slot | Where | Ratio |
| --- | --- | --- |
| Hero | `HERO_IMAGE` in `components/HeroSection.js` | 16:9 |
| Destinations | `image` in `DESTINATIONS`, `lib/constants.js` | 4:3 |
| Packages | `image` in `PACKAGES`, `lib/constants.js` | 4:3 |
| Experiences | `image` in `EXPERIENCES`, `lib/constants.js` | 16:9 (featured) |
| Offer banner | `OFFER_IMAGE` in `components/OfferSection.js` | 4:3 |
| Social share (optional) | `SEO.ogImage` in `lib/seo.js` | 1200×630 |

Example: `image: "/images/destinations/srinagar.jpg"`. Images render through `next/image` and keep the same box size, so the layout does not shift.

## Conversion tracking (dataLayer events)

| Event | Fires when |
| --- | --- |
| `generate_lead` | Only after the server confirms the enquiry (de-duplicated by `lead_id`, which is also sent as the Ads `transaction_id`) |
| `phone_call_click` | Any `tel:` link is clicked (`phone_number`, `click_location`) |
| `whatsapp_click` | Any WhatsApp link is clicked (`click_location`) |
| `package_enquiry` | A package, destination or experience enquiry CTA is clicked (`package_name`) |

In GTM, create a Custom Event trigger for each name, then route them to GA4, Google Ads conversions and remarketing.
Leads also carry UTM, `gclid`, `gbraid` and `wbraid` values to your webhook, so you can import offline conversions later.

## Content

Business details, packages, destinations, experiences and FAQs all live in `lib/constants.js`.
The SEO title, description and JSON-LD live in `lib/seo.js`.
