import { Link } from "react-router";
import { restaurant } from "../data/restaurant";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-[#252A20] text-[#D9C6A5]">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 border-b border-[#D9C6A5]/20 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="[font-family:var(--font-display)] text-4xl font-light leading-tight text-[#F7F4EC] md:text-5xl">
              A table is waiting <em className="text-[#B65D3A]">for you.</em>
            </p>
            <p className="mt-6 max-w-sm leading-relaxed">{restaurant.description}</p>
            <Link
              to="/contact"
              className="mt-8 inline-block border-b-2 border-[#B65D3A] pb-1 text-sm font-bold uppercase tracking-[0.2em] text-[#F7F4EC] transition hover:text-[#B65D3A]"
            >
              Book your evening
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#F7F4EC]">Explore</h2>
              <ul className="space-y-3">
                {restaurant.nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="transition hover:text-[#F7F4EC]">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#F7F4EC]">Visit</h2>
              <address className="space-y-1 not-italic">
                {restaurant.contact.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p className="pt-3">{restaurant.contact.phone}</p>
                <p>{restaurant.contact.email}</p>
              </address>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#F7F4EC]">Hours</h2>
              <ul className="space-y-3">
                {restaurant.hours.map((h) => (
                  <li key={h.days}>
                    <span className="block text-[#F7F4EC]">{h.days}</span>
                    {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="select-none [font-family:var(--font-display)] py-10 text-center text-[clamp(3rem,15vw,13rem)] font-light leading-none tracking-[0.08em] text-[#F7F4EC]/[0.06]"
        >
          {restaurant.name}
        </p>

        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:justify-between">
          <p>
            © {year} {restaurant.name}. Demo template — all details are examples.
          </p>
          <p>Please eat responsibly. Allergen information available on request.</p>
        </div>
      </div>
    </footer>
  );
}