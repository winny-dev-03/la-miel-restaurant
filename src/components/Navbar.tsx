// src/components/Navbar.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { restaurant } from "../data/restaurant";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock, Escape, focus trap, auto-close when the viewport reaches desktop width
  useEffect(() => {
    if (!open) return;

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      toggleRef.current?.focus();
    };
  }, [open]);

  // Desktop link styling (unchanged)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-[#B65D3A] after:transition-transform after:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5] ${
      isActive ? "text-[#F7F4EC] after:scale-x-100" : "text-[#D9C6A5] after:scale-x-0 hover:text-[#F7F4EC] hover:after:scale-x-100"
    }`;

  // Staggered entrance helper for overlay content
  const reveal = (i: number) => ({
    style: { transitionDelay: open ? `${220 + i * 70}ms` : "0ms" },
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#252A20]/95 py-3 shadow-[0_1px_0_0_rgba(217,198,165,0.2)] backdrop-blur"
            : "bg-gradient-to-b from-[#252A20]/80 to-transparent py-6"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            to="/"
            className="[font-family:var(--font-display)] text-xl font-semibold tracking-[0.32em] text-[#F7F4EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5]"
          >
            {restaurant.name}
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {restaurant.nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden border border-[#B65D3A] bg-[#B65D3A] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F7F4EC] transition hover:bg-[#F7F4EC] hover:text-[#252A20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5] sm:inline-block"
            >
              Reserve a table
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="group flex h-11 items-center gap-3 pl-2 text-[#F7F4EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5] lg:hidden"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]">Menu</span>
              <span aria-hidden className="flex w-7 flex-col gap-[6px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-4 self-end bg-[#B65D3A] transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay (sibling of header so backdrop-filter can't clip it) */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] h-[100dvh] overflow-y-auto overscroll-contain bg-[#252A20] text-[#F7F4EC] transition-[clip-path,visibility] duration-[600ms] ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        {/* Decorative terracotta glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(182,93,58,0.28),transparent_55%)]"
        />

        <div className="relative flex min-h-full flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-10">
          {/* Top bar: wordmark + close */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={close}
              className="[font-family:var(--font-display)] text-xl font-semibold tracking-[0.32em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5]"
            >
              {restaurant.name}
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="group flex h-11 items-center gap-3 pl-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5]"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]">Close</span>
              <span aria-hidden className="relative block h-7 w-7">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-[#B65D3A] transition-colors group-hover:bg-current" />
              </span>
            </button>
          </div>

          {/* Divider draws in */}
          <div
            aria-hidden
            className={`mt-4 h-px origin-left bg-[#D9C6A5]/30 transition-transform duration-700 ease-out ${
              open ? "scale-x-100 delay-200" : "scale-x-0"
            }`}
          />

          {/* Navigation */}
          <nav aria-label="Mobile" className="flex flex-1 items-center py-6">
            <ul className="w-full">
              {restaurant.nav.map((item, i) => (
                <li key={item.to} className="overflow-hidden border-b border-[#D9C6A5]/15 last:border-b-0">
                  <div
                    {...reveal(i)}
                    className={`transition duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={close}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-4 py-2.5 [font-family:var(--font-display)] text-[clamp(2.25rem,min(12vw,8svh),4rem)] font-light leading-[1.05] tracking-[-0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D9C6A5] ${
                          isActive ? "italic text-[#B65D3A]" : "text-[#F7F4EC] hover:text-[#D9C6A5]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="w-7 shrink-0 text-[11px] font-bold not-italic tracking-[0.2em] text-[#D9C6A5] [font-family:var(--font-body)]">
                            0{i + 1}
                          </span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">{item.label}</span>
                          {isActive && (
                            <>
                              <span aria-hidden className="ml-1 h-px flex-1 self-center bg-[#B65D3A]" />
                              <span className="sr-only">(current page)</span>
                            </>
                          )}
                        </>
                      )}
                    </NavLink>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer: reservation CTA + contact */}
          <div
            {...reveal(restaurant.nav.length)}
            className={`transition duration-700 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div aria-hidden className="mb-5 h-px bg-[#D9C6A5]/30" />
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#D9C6A5]">{restaurant.tagline}</p>
            <Link
              to="/contact"
              onClick={close}
              className="group flex items-center justify-between border border-[#B65D3A] bg-[#B65D3A] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F7F4EC] transition hover:bg-[#F7F4EC] hover:text-[#252A20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5]"
            >
              Reserve a table
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={`tel:${restaurant.contact.phone.replace(/\s/g, "")}`}
              className="mt-4 inline-block text-sm text-[#D9C6A5] underline decoration-[#B65D3A] decoration-2 underline-offset-4 hover:text-[#F7F4EC]"
            >
              {restaurant.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}