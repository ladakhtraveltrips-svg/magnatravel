import LegalPage from "@/components/LegalPage";
import { BUSINESS, formatPhone, telHref } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Magna Travels website and requesting Kashmir tour package quotations.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms" updated="November 2026">
      <p>
        These terms apply to your use of the {BUSINESS.name} website. By using the website or sending us an enquiry you
        agree to them.
      </p>
      <section>
        <h2>Enquiries and quotations</h2>
        <p>
          Submitting an enquiry does not confirm a booking. Itineraries and prices are shared individually based on your
          travel dates, group size, hotel category and availability, and may change until your booking is confirmed in
          writing.
        </p>
      </section>
      <section>
        <h2>Bookings, payments and cancellations</h2>
        <p>
          Payment schedules, inclusions, exclusions and cancellation or refund terms are specific to each package and are
          shared with your quotation. Please read them carefully before confirming your booking.
        </p>
      </section>
      <section>
        <h2>Travel conditions</h2>
        <p>
          Sightseeing, road access and activities in Kashmir and Ladakh can be affected by weather, road closures and
          local regulations. In such cases we will work with you on reasonable alternatives where possible.
        </p>
      </section>
      <section>
        <h2>Website content</h2>
        <p>
          We aim to keep the information on this website accurate and up to date, but descriptions of destinations and
          experiences are for general guidance only. Content on this website may not be copied without our permission.
        </p>
      </section>
      <section>
        <h2>Contact us</h2>
        <p>
          {BUSINESS.name}, {BUSINESS.addressLine}
          <br />
          Email: <a href={`mailto:${BUSINESS.emails[0]}`}>{BUSINESS.emails[0]}</a>
          <br />
          Phone: <a href={telHref(BUSINESS.phones[0])}>{formatPhone(BUSINESS.phones[0])}</a>
        </p>
      </section>
    </LegalPage>
  );
}
