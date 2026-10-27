import { Link } from "react-router";
import Button from "../components/Button";
import Gallery from "../components/Gallery";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import { dishes, formatPrice } from "../data/menu";
import { images, restaurant } from "../data/restaurant";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle();
  const featured = dishes.filter((d) => d.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#252A20] text-[#F7F4EC]">
        <SmartImage src={images.hero} alt="A beautifully plated dish on a candlelit table" className="absolute inset-0" eager />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#252A20_8%,rgba(37,42,32,0.55)_45%,rgba(37,42,32,0.35)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-10 pt-40 md:px-10 md:pb-14">
          <p className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D9C6A5]">
            <span aria-hidden className="h-px w-12 bg-[#B65D3A]" />
            {restaurant.tagline}
          </p>
          <h1 className="[font-family:var(--font-display)] max-w-[14ch] text-[clamp(3.6rem,12vw,10.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
            Dinner, <em className="text-[#D9C6A5]">lit by</em> <span className="text-[#B65D3A]">fire.</span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <p className="text-base leading-relaxed text-[#F7F4EC]/90 md:text-lg">{restaurant.description}</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button to="/contact">Reserve a table</Button>
                <Button to="/menu" variant="light">
                  Explore the menu
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-6 border-t border-[#D9C6A5]/30 pt-6 md:min-w-[420px]">
              {restaurant.stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 text-[11px] uppercase tracking-[0.18em] text-[#D9C6A5]">{s.label}</dt>
                  <dd className="[font-family:var(--font-display)] text-4xl font-light md:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* IDENTITY STRIP */}
      <section className="overflow-hidden bg-[#D9C6A5] py-6 text-[#252A20]" aria-label="Our approach">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 px-5 text-xs font-bold uppercase tracking-[0.3em] md:text-sm">
          {["Open fire", "Seasonal", "Locally grown", "Slow service", "Made by hand"].map((t, i) => (
            <li key={t} className="flex items-center gap-10">
              {t}
              {i < 4 && <span aria-hidden className="hidden h-1.5 w-1.5 rotate-45 bg-[#B65D3A] md:block" />}
            </li>
          ))}
        </ul>
      </section>

      {/* CULINARY IDENTITY */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SectionHeading
            eyebrow="Culinary identity"
            title={
              <>
                We cook what the land <em className="text-[#B65D3A]">gives us</em>, and little else.
              </>
            }
          />
        </Reveal>
        <Reveal delay={150} className="lg:col-span-4 lg:col-start-9 lg:pt-24">
          <p className="text-lg leading-relaxed text-[#625E54]">
            Our kitchen has no gas line. Everything is cooked over embers of local hardwood, from the first charred plantain to the last
            smoked-sugar dessert. It is slower and harder — and it tastes like nothing else.
          </p>
          <Link to="/about" className="mt-6 inline-block border-b-2 border-[#B65D3A] pb-1 text-sm font-bold uppercase tracking-[0.2em] hover:text-[#B65D3A]">
            Read our story
          </Link>
        </Reveal>
      </section>

      {/* FEATURED DISHES */}
      <section className="bg-[#F7F4EC] pb-24 md:pb-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Signature plates" title="From the fire" />
            <Button to="/menu" variant="dark">
              Full menu
            </Button>
          </div>
          <div className="grid gap-10 md:grid-cols-12">
            {featured.map((dish, i) => (
              <Reveal
                key={dish.id}
                delay={i * 120}
                className={
                  i === 0
                    ? "md:col-span-7"
                    : i === 1
                      ? "md:col-span-5 md:mt-24"
                      : "md:col-span-6 md:col-start-4"
                }
              >
                <article className="group">
                  <SmartImage
                    src={dish.image ?? images.plate}
                    alt={`${dish.name}, plated`}
                    className={i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}
                    imgClassName="transition duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="mt-5 flex items-baseline justify-between gap-6 border-b border-[#252A20]/20 pb-5">
                    <div>
                      <h3 className="[font-family:var(--font-display)] text-3xl font-light md:text-4xl">{dish.name}</h3>
                      <p className="mt-2 max-w-md text-[#625E54]">{dish.description}</p>
                    </div>
                    <p className="whitespace-nowrap text-lg font-semibold tabular-nums">{formatPrice(dish.price)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="grain relative overflow-hidden bg-[#252A20] py-24 text-[#F7F4EC] md:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <SmartImage src={images.interior} alt="Warmly lit dining room at THE TABLE" className="aspect-[4/5] w-full" />
            <SmartImage
              src={images.table}
              alt="Shared dishes laid out on a long table"
              className="absolute -bottom-10 -right-2 hidden aspect-square w-2/5 border-8 border-[#252A20] md:block lg:-right-12"
            />
            <p
              aria-hidden
              className="absolute -left-3 top-8 hidden origin-top-left -rotate-90 text-xs font-bold uppercase tracking-[0.4em] text-[#D9C6A5] md:block"
            >
              Est. 2013
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
            <SectionHeading eyebrow="Our story" title={<>A kitchen built around <em className="text-[#D9C6A5]">one long table.</em></>} tone="light">
              It began with a single table and a borrowed grill. Twelve years on, the idea is unchanged: good ingredients, honest fire, and
              enough time for people to actually talk.
            </SectionHeading>
            <Button to="/about" variant="light" className="mt-10">
              Discover THE TABLE
            </Button>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE / CHEF */}
      <section className="grid lg:grid-cols-2">
        <SmartImage src={images.chef} alt="Executive chef at work in the kitchen" className="min-h-[420px] lg:min-h-[680px]" />
        <div className="flex items-center bg-[#B65D3A] px-5 py-20 text-[#F7F4EC] md:px-14 lg:px-20">
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em]">The chef's table</p>
            <h2 className="[font-family:var(--font-display)] text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em]">
              Eight seats. <em>Six courses.</em> One open kitchen.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed">
              Sit at the pass with Chef Amara and watch the evening unfold plate by plate — with stories from the fire and pairings chosen
              for the night.
            </p>
            <Button to="/contact" variant="light" className="mt-9">
              Enquire about the chef's table
            </Button>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <SectionHeading eyebrow="Gallery" title={<>The evening, <em className="text-[#B65D3A]">in frames</em></>} className="mb-14" />
        <Gallery />
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#D9C6A5] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHeading eyebrow="Kind words" title="Heard at the table" className="mb-16" />
          <div className="grid gap-px bg-[#252A20]/25 md:grid-cols-3">
            {restaurant.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120} className="bg-[#D9C6A5]">
                <figure className="flex h-full flex-col justify-between gap-10 p-8 md:p-10">
                  <blockquote className="[font-family:var(--font-display)] text-2xl font-light leading-snug">
                    <span aria-hidden className="mb-2 block text-6xl leading-none text-[#B65D3A]">“</span>
                    {t.quote}
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="block font-bold uppercase tracking-[0.18em]">{t.name}</span>
                    <span className="text-[#252A20]/80">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#252A20]/80">Sample testimonials for demonstration purposes.</p>
        </div>
      </section>

      {/* HOURS & RESERVATION */}
      <section className="grain relative bg-[#252A20] py-24 text-[#F7F4EC] md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Reserve" title={<>Join us <em className="text-[#B65D3A]">this week.</em></>} tone="light">
              We keep half the room for walk-ins, but weekends fill quickly. Tell us the occasion and we'll take care of the rest.
            </SectionHeading>
            <Button to="/contact" className="mt-10">
              Make an enquiry
            </Button>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#D9C6A5]">Opening hours</h3>
              <ul className="space-y-4">
                {restaurant.hours.map((h) => (
                  <li key={h.days} className="border-b border-[#D9C6A5]/20 pb-4">
                    <span className="block [font-family:var(--font-display)] text-xl">{h.days}</span>
                    <span className="text-[#D9C6A5]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#D9C6A5]">Find us</h3>
              <address className="space-y-1 not-italic text-[#D9C6A5]">
                {restaurant.contact.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p className="pt-4 text-[#F7F4EC]">{restaurant.contact.phone}</p>
                <p className="text-[#F7F4EC]">{restaurant.contact.email}</p>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}