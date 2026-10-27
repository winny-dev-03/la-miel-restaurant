import { restaurant } from "../data/restaurant";

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  guests: string;
  message: string;
}

export interface SubmitResult {
  ok: boolean;
  demo: boolean;
}

export async function submitEnquiry(data: Enquiry): Promise<SubmitResult> {
  const endpoint = restaurant.formEndpoint;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, demo: true };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: res.ok, demo: false };
}