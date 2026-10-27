import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import { images, restaurant } from "../data/restaurant";
import { usePageTitle } from "../hooks/usePageTitle";

const principles = [
  { title: "Know the grower", text: "Most of what we cook comes from people we can name, within a day's drive of the kitchen." },
  { title: "Respect the season", text: "If it isn't at its best, it isn't on the menu. Dishes change as the market does." },
  { title: "Let the fire speak", text: "Ember, smoke and char do the heavy lifting, so we add less and say more." },
];

export default function About() {
  usePageTitle("About");
  return (
    <>
      {/* INTRO */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 pt-44 md:px-10 md:pb-32">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#625E54]">About {restaurant.name}</p>
        <h1 className="[font-family:var(--font-display)] max-w-5xl text-[clamp(3rem,9vw,8rem)] font-light leading-[0.92] tracking-[-0.03em]">
          Hospitality is <em className="text-[#B65D3A]">an old craft.</em> We're just keeping it alive.
        </h1>
      </section>

      <section className="relative">
        <SmartImage src={images.dining} alt="Guests dining in the main room" className="h-[55vh] w-full md:h-[75vh]" eager />
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Our story" title={<>From a borrowed grill to a <em className="text-[#B65D3A]">full room.</em></>} />
        </div>
        <Reveal className="space-y-6 text-lg leading-relaxed text-[#625E54] lg:col-span-6 lg:col-start-7">
          <p className="[font-family:var(--font-display)] text-2xl font-light leading-snug text-[#252A20] md:text-3xl">
            THE TABLE began as a supper club — one long table, one grill and twelve friends.
          </p>
          <p>
            Word spread, the table grew, and eventually the grill needed a proper home. We kept the spirit: shared plates, open cooking and
            an unhurried pace.
          </p>
          <p>
            Today the room seats sixty, but the idea hasn't changed. Everyone is at the same table, and everyone is looked after the same
            way.
          </p>
          <p className="text-sm">This is sample copy — replace it with your restaurant's own story.</p>
        </Reveal>
      </section>

      {/* PHILOSOPHY */}
      <section className="grain relative bg-[#252A20] py-24 text-[#F7F4EC] md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHeading eyebrow="Philosophy" title={<>Three ideas, <em className="text-[#D9C6A5]">cooked daily.</em></>} tone="light" className="mb-16" />
          <div className="grid gap-px bg-[#D9C6A5]/20 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="bg-[#252A20]">
                <div className="p-8 md:p-12">
                  <p className="[font-family:var(--font-display)] text-6xl font-light text-[#B65D3A]">0{i + 1}</p>
                  <h3 className="mt-6 [font-family:var(--font-display)] text-3xl font-light">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-[#D9C6A5]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* DINING EXPERIENCE */}
      <section className="grid bg-[#D9C6A5] lg:grid-cols-2">
        <div className="flex items-center px-5 py-20 md:px-14 lg:px-20">
          <Reveal>
            <SectionHeading eyebrow="The experience" title={<>Slow down. <em className="text-[#B65D3A]">Stay a while.</em></>} />
            <ul className="mt-8 space-y-4 text-lg">
              {["Candlelit room with a live-fire open kitchen", "Shared plates designed for conversation", "Alcohol-free pairings as thoughtful as the wine list", "Private dining for up to twenty guests"].map((t) => (
                <li key={t} className="flex gap-4 border-b border-[#252A20]/25 pb-4">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#B65D3A]" />
                  {t}
                </li>
              ))}
            </ul>
            <Button to="/contact" variant="dark" className="mt-10">
              Plan your visit
            </Button>
          </Reveal>
        </div>
        <SmartImage src={images.interiorTwo} alt="The restaurant interior at dusk" className="min-h-[420px] lg:min-h-[640px]" />
      </section>
    </>
  );
}