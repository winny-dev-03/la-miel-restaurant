import { useCallback, useEffect, useRef, useState } from "react";
import { restaurant } from "../data/restaurant";
import SmartImage from "./SmartImage";

export default function Gallery() {
  const items = restaurant.gallery;
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <>
      <ul className="grid auto-rows-[160px] grid-cols-2 gap-2 sm:auto-rows-[200px] md:auto-rows-[240px] md:grid-cols-4 md:gap-3">
        {items.map((item, i) => (
          <li key={item.src} className={item.className}>
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`Open photo: ${item.alt}`}
              className="group relative block h-full w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B65D3A]"
            >
              <SmartImage
                src={item.src}
                alt={item.alt}
                className="h-full w-full"
                imgClassName="transition duration-[900ms] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[#252A20]/0 transition duration-500 group-hover:bg-[#252A20]/30" />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-[#F7F4EC] text-[#252A20] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#252A20]/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 h-11 w-11 border border-[#D9C6A5]/50 text-2xl text-[#F7F4EC] hover:bg-[#F7F4EC] hover:text-[#252A20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9C6A5]"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 border border-[#D9C6A5]/50 text-[#F7F4EC] hover:bg-[#F7F4EC] hover:text-[#252A20] md:left-8"
          >
            ←
          </button>
          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <SmartImage src={items[active].src} alt={items[active].alt} className="aspect-[4/3] max-h-[78vh] w-full" imgClassName="!object-contain" eager />
            <figcaption className="mt-4 text-center text-sm text-[#D9C6A5]">
              {items[active].alt} · {active + 1} / {items.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 border border-[#D9C6A5]/50 text-[#F7F4EC] hover:bg-[#F7F4EC] hover:text-[#252A20] md:right-8"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}