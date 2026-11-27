import Image from "next/image";
import { LOGO_PATH } from "@/lib/constants";

/** Official Magna Travels logo (gold "M" with plane) as a rounded badge. */
export function LogoBadge({ size = 44, className = "", priority = false }) {
  return (
    <Image
      src={LOGO_PATH}
      alt="Magna Travels logo"
      width={size}
      height={size}
      sizes={`${size * 2}px`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-black/10 ${className}`}
    />
  );
}

export default function Logo({ light = false, size = 44, priority = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoBadge size={size} priority={priority} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[17px] font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
          Magna Travels
        </span>
        <span className={`mt-1 text-[10px] font-medium uppercase tracking-[0.2em] ${light ? "text-accent" : "text-accent-600"}`}>
          Kashmir Holidays
        </span>
      </span>
    </span>
  );
}
