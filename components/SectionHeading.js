export default function SectionHeading({ id, eyebrow, title, subtitle, align = "left", action, light = false }) {
  const centered = align === "center";
  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:mb-10 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className={`eyebrow ${light ? "!text-accent" : ""}`}>{eyebrow}</p>}
        <h2
          id={id}
          className={`mt-2.5 text-[26px] font-bold leading-tight sm:text-[32px] ${light ? "!text-white" : ""}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-[15px] leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
