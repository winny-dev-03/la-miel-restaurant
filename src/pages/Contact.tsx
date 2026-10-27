import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "../components/Reveal";
import { restaurant } from "../data/restaurant";
import { usePageTitle } from "../hooks/usePageTitle";
import { submitEnquiry, type Enquiry } from "../lib/submitEnquiry";

const enquiryTypes = ["Table reservation", "Chef's table", "Private dining", "General enquiry"];

const empty: Enquiry = { name: "", email: "", phone: "", type: enquiryTypes[0], date: "", guests: "2", message: "" };

type Errors = Partial<Record<keyof Enquiry, string>>;
type Status = "idle" | "sending" | "success" | "demo" | "error";

function validate(v: Enquiry): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[+\d\s()-]{7,20}$/.test(v.phone)) e.phone = "Please enter a valid phone number.";
  if (v.type === "Table reservation" || v.type === "Chef's table") {
    if (!v.date) e.date = "Please choose a preferred date.";
    const g = Number(v.guests);
    if (!Number.isInteger(g) || g < 1 || g > 20) e.guests = "Guests must be between 1 and 20.";
  }
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

const field =
  "w-full border bg-transparent px-4 py-3.5 text-[#252A20] placeholder:text-[#625E54]/70 transition focus:outline-none focus:ring-2 focus:ring-[#B65D3A]";

export default function Contact() {
  usePageTitle("Contact");
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      return;
    }
    setStatus("sending");
    try {
      const res = await submitEnquiry(values);
      if (res.ok) {
        setStatus(res.demo ? "demo" : "success");
        setValues(empty);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const borderFor = (k: keyof Enquiry) => (errors[k] ? "border-[#B65D3A]" : "border-[#252A20]/35");
  const err = (k: keyof Enquiry) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm font-medium text-[#8F3E1F]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Enquiry) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <>
      <section className="grain relative bg-[#252A20] px-5 pb-20 pt-44 text-[#F7F4EC] md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D9C6A5]">Contact & reservations</p>
          <h1 className="[font-family:var(--font-display)] text-[clamp(3.2rem,10vw,8.5rem)] font-light leading-[0.9] tracking-[-0.03em]">
            Let's set <em className="text-[#B65D3A]">a place.</em>
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12">
        {/* DETAILS */}
        <div className="space-y-12 lg:col-span-5">
          <Reveal>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#625E54]">Visit</h2>
            <address className="space-y-1 [font-family:var(--font-display)] text-3xl font-light not-italic leading-snug">
              {restaurant.contact.addressLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
            <p className="mt-3 text-sm text-[#625E54]">Example address — replace in src/data/restaurant.ts.</p>
          </Reveal>
          <Reveal>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#625E54]">Talk to us</h2>
            <p className="text-lg">
              <a className="underline decoration-[#B65D3A] decoration-2 underline-offset-4 hover:text-[#B65D3A]" href={`tel:${restaurant.contact.phone.replace(/\s/g, "")}`}>
                {restaurant.contact.phone}
              </a>
            </p>
            <p className="mt-2 text-lg">
              <a className="underline decoration-[#B65D3A] decoration-2 underline-offset-4 hover:text-[#B65D3A]" href={`mailto:${restaurant.contact.email}`}>
                {restaurant.contact.email}
              </a>
            </p>
          </Reveal>
          <Reveal>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#625E54]">Opening hours</h2>
            <ul>
              {restaurant.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6 border-b border-[#252A20]/20 py-3">
                  <span>{h.days}</span>
                  <span className="text-[#625E54]">{h.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div
              role="img"
              aria-label="Map placeholder"
              className="grain relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#D9C6A5] p-6 text-center"
            >
              <p className="relative z-10 text-sm text-[#252A20]">
                Map placeholder. Embed your own map (Google Maps, OpenStreetMap) once your real address is set.
              </p>
            </div>
          </Reveal>
        </div>

        {/* FORM */}
        <div className="lg:col-span-7">
          <form noValidate onSubmit={onSubmit} className="border border-[#252A20]/25 bg-[#F7F4EC] p-6 md:p-10" aria-labelledby="enquiry-title">
            <h2 id="enquiry-title" className="[font-family:var(--font-display)] text-4xl font-light">
              Send an enquiry
            </h2>
            <p className="mt-2 text-[#625E54]">We usually reply within one working day. This is an enquiry, not a confirmed booking.</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Full name</label>
                <input id="name" name="name" autoComplete="name" value={values.name} onChange={onChange} className={`${field} ${borderFor("name")}`} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} className={`${field} ${borderFor("email")}`} {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={onChange} className={`${field} ${borderFor("phone")}`} {...aria("phone")} />
                {err("phone")}
              </div>
              <div>
                <label htmlFor="type" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Enquiry type</label>
                <select id="type" name="type" value={values.type} onChange={onChange} className={`${field} ${borderFor("type")}`}>
                  {enquiryTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Preferred date</label>
                <input id="date" name="date" type="date" value={values.date} onChange={onChange} className={`${field} ${borderFor("date")}`} {...aria("date")} />
                {err("date")}
              </div>
              <div>
                <label htmlFor="guests" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Guests</label>
                <input id="guests" name="guests" type="number" min={1} max={20} value={values.guests} onChange={onChange} className={`${field} ${borderFor("guests")}`} {...aria("guests")} />
                {err("guests")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Message</label>
                <textarea id="message" name="message" rows={5} value={values.message} onChange={onChange} placeholder="Occasion, dietary needs, anything we should know…" className={`${field} ${borderFor("message")}`} {...aria("message")} />
                {err("message")}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full bg-[#252A20] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F7F4EC] transition hover:bg-[#B65D3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B65D3A] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>

            <div aria-live="polite" className="mt-6">
              {Object.keys(errors).length > 0 && (
                <p role="alert" className="border-l-4 border-[#B65D3A] bg-[#D9C6A5]/40 p-4 text-sm font-medium">
                  Please correct the highlighted fields and try again.
                </p>
              )}
              {status === "demo" && (
                <p role="status" className="border-l-4 border-[#625E54] bg-[#D9C6A5]/40 p-4 text-sm">
                  <strong>Demo mode:</strong> your details passed validation, but no message was sent because no form service is connected yet.
                  Set <code>formEndpoint</code> in <code>src/data/restaurant.ts</code> to go live.
                </p>
              )}
              {status === "success" && (
                <p role="status" className="border-l-4 border-[#252A20] bg-[#D9C6A5]/40 p-4 text-sm">
                  Thank you — your enquiry has been sent. We'll reply by email soon. Your table is not confirmed until we respond.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="border-l-4 border-[#B65D3A] bg-[#D9C6A5]/40 p-4 text-sm font-medium">
                  Sorry, something went wrong sending your enquiry. Please try again or contact us by phone.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}