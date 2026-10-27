import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/** Image with a branded fallback if the external URL fails to load. */
export default function SmartImage({ src, alt, className = "", imgClassName = "", eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#625E54] ${className}`}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#252A20_0%,#625E54_100%)] p-4"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D9C6A5]">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}