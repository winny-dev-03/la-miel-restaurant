import { useMemo, useState } from "react";
import Button from "../components/Button";
import MenuCard from "../components/MenuCard";
import Reveal from "../components/Reveal";
import SmartImage from "../components/SmartImage";
import { categories, dietaryLabels, dishes, menuHeroImage, menuNotice, type CategoryId } from "../data/menu";
import { restaurant } from "../data/restaurant";
import { usePageTitle } from "../hooks/usePageTitle";

type Filter = "all" | CategoryId;

const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories.map((c) => ({ id: c.id, label: c.label }))];

export default function Menu() {
  usePageTitle("Menu");
  const [active, setActive] = useState<Filter>("all");

  const sections = useMemo(
    () =>
      categories
        .map((cat, i) => {
          const items = dishes.filter((d) => d.category === cat.id);
          const features = items.filter((d) => d.featured).slice(0, 2);
          const rows = items.filter((d) => !features.includes(d));
          return { cat, number: String(i + 1).padStart(2, "0"), features, rows, count: items.length };
        })
        .filter((s) => active === "all" || s.cat.id === active),
    [active],
  );

  const total = sections.reduce((sum, s) => sum + s.count, 0);
  const activeLabel = filters.find((f) => f.id === active)?.label ?? "All";

  const filterClass = (on: boolean) =>
    `shrink-0 whitespace-nowrap px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B65D3A] ${
      on ? "bg-[#252A20] text-[#F7F4EC]" : "border border-[#252A20]/30 text-[#252A20] hover:border-[#252A20]"
    }`;

  return (
    <>
      {/* OPENING */}
      <section className="grain relative flex min-h-[78svh] items-end overflow-hidden bg-[#252A20] text-[#F7F4EC]">
        <SmartImage
          src={menuHeroImage}
          alt="A grilled steak served as part of the menu"
          className="absolute inset-0"
          imgClassName="object-[50%_45%]"
          eager
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#252A20_6%,rgba(37,42,32,0.55)_50%,rgba(37,42,32,0.3)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 pt-44 md:px-10 md:pb-20">
          <p className="mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D9C6A5]">
            <span aria-hidden className="h-px w-10 bg-[#B65D3A]" />
            {restaurant.name} · Sample menu
          </p>
          <h1 className="[font-family:var(--font-display)] text-[clamp(3.6rem,12vw,10rem)] font-light leading-[0.88] tracking-[-0.03em]">
            The <em className="text-[#B65D3A]">menu.</em>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-[#F7F4EC]/90 md:text-lg">
            Honest cooking, generously served — from small plates and grilled mains to desserts and chilled, alcohol-free drinks.
          </p>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-[#D9C6A5]">{menuNotice}</p>
        </div>
      </section>

      {/* MENU */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        {/* Category navigation */}
        <div className="sticky top-[68px] z-30 -mx-5 border-b border-[#252A20]/15 bg-[#F7F4EC]/95 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
          <div
            role="group"
            aria-label="Filter menu by category"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((f) => (
              <button key={f.id} type="button" aria-pressed={active === f.id} onClick={() => setActive(f.id)} className={filterClass(active === f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {total} dishes in {activeLabel}.
        </p>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {sections.map(({ cat, number, features, rows }) => (
            <Reveal key={cat.id}>
              <section aria-labelledby={`cat-${cat.id}`}>
                <header className="grid gap-4 border-t border-[#252A20] pt-6 lg:grid-cols-12 lg:items-end">
                  <p aria-hidden className="[font-family:var(--font-display)] text-6xl font-light leading-none text-[#B65D3A] lg:col-span-2 md:text-7xl">
                    {number}
                  </p>
                  <h2
                    id={`cat-${cat.id}`}
                    className="[font-family:var(--font-display)] text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-none tracking-[-0.02em] lg:col-span-6"
                  >
                    {cat.label}
                  </h2>
                  <p className="max-w-xs text-[#625E54] lg:col-span-4 lg:justify-self-end">{cat.blurb}</p>
                </header>

                {features.length > 0 && (
                  <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
                    {features.map((dish, i) => (
                      <div key={dish.id} className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-20"}>
                        <MenuCard dish={dish} variant="feature" tall={i === 1} />
                      </div>
                    ))}
                  </div>
                )}

                {rows.length > 0 && (
                  <div className="mt-12 grid gap-x-16 border-b border-[#252A20]/20 lg:grid-cols-2">
                    {rows.map((dish) => (
                      <MenuCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <aside className="mt-24 border-t border-[#252A20]/20 pt-8 text-sm text-[#625E54]" aria-label="Menu notes">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(["V", "VG", "Spicy"] as const).map((k) => (
              <li key={k}>
                <strong className="text-[#252A20]">{k}</strong> — {dietaryLabels[k]}
              </li>
            ))}
          </ul>
          <p className="mt-3">{menuNotice}</p>
          <p className="mt-1">Please tell us about any allergies before ordering.</p>
        </aside>
      </section>

      <section className="grain relative bg-[#252A20] py-20 text-center text-[#F7F4EC]">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="[font-family:var(--font-display)] text-4xl font-light md:text-6xl">
            Hungry <em className="text-[#B65D3A]">yet?</em>
          </h2>
          <p className="mt-5 text-lg text-[#D9C6A5]">Send us a reservation enquiry and we'll look after the rest.</p>
          <Button to="/contact" className="mt-8">
            Reserve a table
          </Button>
        </div>
      </section>
    </>
  );
}