import Link from "next/link";
import { LANDING_PATH } from "@/lib/constants";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-3 text-3xl font-bold">This page could not be found</h1>
        <p className="mt-2 text-muted">Let&apos;s get you back to planning your Kashmir holiday.</p>
        <Link href={LANDING_PATH} className="btn-primary mt-6">
          View Kashmir Tour Packages
        </Link>
      </div>
    </main>
  );
}
