import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, tone = "dark", className = "", children }: Props) {
  const light = tone === "light";
  return (
    <div className={className}>
      <p
        className={`mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] ${
          light ? "text-[#D9C6A5]" : "text-[#625E54]"
        }`}
      >
        <span aria-hidden className={`h-px w-10 ${light ? "bg-[#D9C6A5]" : "bg-[#B65D3A]"}`} />
        {eyebrow}
      </p>
      <h2
        className={`[font-family:var(--font-display)] text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] ${
          light ? "text-[#F7F4EC]" : "text-[#252A20]"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${light ? "text-[#D9C6A5]" : "text-[#625E54]"}`}>
          {children}
        </p>
      )}
    </div>
  );
}