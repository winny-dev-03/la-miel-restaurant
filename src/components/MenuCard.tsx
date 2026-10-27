import { dietaryLabels, formatPrice, type Dish } from "../data/menu";
import SmartImage from "./SmartImage";

function Tags({ tags }: { tags?: Dish["tags"] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Dietary information">
      {tags.map((t) => (
        <li
          key={t}
          title={dietaryLabels[t]}
          className="border border-[#252A20]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#252A20]"
        >
          <span aria-hidden>{t}</span>
          <span className="sr-only">{dietaryLabels[t]}</span>
        </li>
      ))}
    </ul>
  );
}

function NameAndPrice({ dish, large }: { dish: Dish; large?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <h3
        className={`[font-family:var(--font-display)] font-light leading-tight ${
          large ? "text-3xl md:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        {dish.name}
      </h3>
      <span aria-hidden className="mb-1 min-w-4 flex-1 self-end border-b border-dotted border-[#625E54]/60" />
      <p className={`whitespace-nowrap font-semibold tabular-nums ${large ? "text-xl" : "text-base sm:text-lg"}`}>
        {formatPrice(dish.price)}
      </p>
    </div>
  );
}

interface Props {
  dish: Dish;
  /** "feature" = large editorial photograph, "row" = refined list row with a small photo. */
  variant?: "row" | "feature";
  /** Feature only: portrait crop for visual rhythm. */
  tall?: boolean;
}

export default function MenuCard({ dish, variant = "row", tall = false }: Props) {
  if (variant === "feature") {
    return (
      <article className="group">
        <SmartImage
          src={dish.image}
          alt={`Photograph of ${dish.name}`}
          className={tall ? "aspect-[4/5]" : "aspect-[4/3]"}
          imgClassName="transition duration-[1200ms] group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="mt-5 border-b border-[#252A20]/20 pb-6">
          <NameAndPrice dish={dish} large />
          <p className="mt-3 max-w-md leading-relaxed text-[#625E54]">{dish.description}</p>
          <Tags tags={dish.tags} />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 border-t border-[#252A20]/20 py-6 sm:gap-6">
      <SmartImage
        src={dish.image}
        alt={`Photograph of ${dish.name}`}
        className="h-20 w-20 shrink-0 sm:h-24 sm:w-24"
        imgClassName="transition duration-700 group-hover:scale-110 motion-reduce:transition-none"
      />
      <div className="min-w-0 flex-1">
        <NameAndPrice dish={dish} />
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#625E54] sm:text-base">{dish.description}</p>
        <Tags tags={dish.tags} />
      </div>
    </article>
  );
}