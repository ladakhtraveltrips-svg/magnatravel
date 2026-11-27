import Image from "next/image";

const TONES = {
  mint: { bg: "from-[#F1F7F5] to-[#E1EEE9]", icon: "text-primary/25" },
  sand: { bg: "from-[#FBF7F0] to-[#F1E8D8]", icon: "text-accent-600/35" },
  navy: { bg: "from-[#EEF2F7] to-[#DDE5EF]", icon: "text-navy/20" },
  dark: { bg: "from-[#1B4A48] to-[#143E3C]", icon: "text-white/20" },
};

/**
 * Reusable image slot.
 *  - No `src`  -> a clean, quiet placeholder (soft gradient + small mountain mark).
 *  - With `src` -> an optimised next/image filling the same box (zero layout shift).
 *
 * Usage: <ImagePlaceholder src="/images/hero/kashmir.jpg" alt="Dal Lake in Srinagar" ratio="16/9" priority />
 */
export default function ImagePlaceholder({
  src = null,
  alt = "",
  ratio = "4/3",
  tone = "mint",
  className = "",
  rounded = "rounded-2xl",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  label,
  iconSize = "h-10 w-10",
  children,
}) {
  const t = TONES[tone] || TONES.mint;
  const style = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <div
      className={`relative isolate overflow-hidden ${rounded} ${className}`}
      style={style}
      data-image-slot={label || alt || "image"}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : (
        <div aria-hidden="true" className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${t.bg}`}>
          <svg viewBox="0 0 48 48" className={`${iconSize} ${t.icon}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M4 38 L17 20 L25 30 L31 23 L44 38 Z" />
            <circle cx="35" cy="12" r="3.5" />
          </svg>
        </div>
      )}
      {children}
    </div>
  );
}
