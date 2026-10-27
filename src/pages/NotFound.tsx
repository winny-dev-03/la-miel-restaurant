import Button from "../components/Button";
import { restaurant } from "../data/restaurant";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="grain relative flex min-h-screen items-center bg-[#252A20] px-5 py-40 text-[#F7F4EC] md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D9C6A5]">Error 404</p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-[clamp(5rem,20vw,16rem)] font-light leading-[0.85] tracking-[-0.04em] text-[#B65D3A]">
          404
        </h1>
        <p className="mt-6 max-w-lg [font-family:var(--font-display)] text-3xl font-light md:text-4xl">
          This table isn't set. The page you're after has moved or never existed.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/">Back to {restaurant.name}</Button>
          <Button to="/menu" variant="light">
            View the menu
          </Button>
        </div>
      </div>
    </section>
  );
}