import { useEffect } from "react";
import { restaurant } from "../data/restaurant";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${restaurant.name}` : `${restaurant.name} · ${restaurant.tagline}`;
  }, [title]);
}