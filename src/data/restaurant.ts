
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: unsplash("photo-1414235077428-338989a2e8c0", 2000),
  interior: unsplash("photo-1517248135467-4c7edcad34c4", 1600),
  interiorTwo: unsplash("photo-1559339352-11d035aa65de", 1600),
  dining: unsplash("photo-1424847651672-bf20a4b0982b", 1600),
  chef: unsplash("photo-1577219491135-ce391730fb2c", 1200),
  plate: unsplash("photo-1476224203421-9ac39bcb3327", 1200),
  steak: unsplash("photo-1544025162-d76694265947", 1200),
  pasta: unsplash("photo-1473093295043-cdd812d0e601", 1200),
  grill: unsplash("photo-1555939594-58d7cb561ad1", 1200),
  salad: unsplash("photo-1546069901-ba9599a7e63c", 1200),
  table: unsplash("photo-1504674900247-0877df9cc836", 1200),
  dessert: unsplash("photo-1551024601-bec78aea704b", 1200),
  drink: unsplash("photo-1470337458703-46ad1756a187", 1200),
  pizza: unsplash("photo-1565299624946-b28f40a0ae38", 1200),
};

export const restaurant = {
  name: "La Miel",
  tagline: "Fire, season & slow evenings",
  description:
    "A contemporary dining room celebrating West African ingredients through open-fire cooking and quiet, considered hospitality.",
  contact: {

    addressLines: ["00 Example Street", "Your Neighbourhood", "Your City, Nigeria"],
    phone: "+234 000 000 0000",
    email: "reservations@example.com",
  },

  formEndpoint: "https://formspree.io/f/xeaaanjw",
  hours: [
    { days: "Tuesday – Thursday", time: "5:00 pm – 10:30 pm" },
    { days: "Friday – Saturday", time: "12:00 pm – 11:30 pm" },
    { days: "Sunday", time: "12:00 pm – 9:00 pm" },
    { days: "Monday", time: "Closed" },
  ],
  nav: [
    { to: "/", label: "Home", end: true },
    { to: "/menu", label: "Menu", end: false },
    { to: "/about", label: "About", end: false },
    { to: "/contact", label: "Contact", end: false },
  ],
  stats: [
    { value: "12", label: "Years of service" },
    { value: "38", label: "Local growers & fishers" },
    { value: "4", label: "Fires, no gas" },
  ],
  testimonials: [
    {
      quote:
        "The smoked jollof alone was worth the journey. Every course arrived with a story, and none of it felt rehearsed.",
      name: "Adaeze O.",
      role: "Food writer",
    },
    {
      quote:
        "We booked for an anniversary and were treated like old friends. The room, the light, the pacing — simply perfect.",
      name: "Tunde & Kemi",
      role: "Guests since 2021",
    },
    {
      quote:
        "Proper cooking with proper restraint. The grilled catch is the best thing I have eaten in the city this year.",
      name: "Michael A.",
      role: "Regular",
    },
  ],
  team: [
    {
      name: "Chef Amara Nwosu",
      role: "Executive Chef",
      bio: "Trained in Lagos and Lyon, Amara builds menus around what the season and the fire allow.",
      image: images.chef,
    },
    {
      name: "Sade Bello",
      role: "Head of Hospitality",
      bio: "Sade shapes the rhythm of every service, from first greeting to last pour.",
      image: images.interiorTwo,
    },
    {
      name: "Emeka Obi",
      role: "Head of Bar",
      bio: "Emeka's alcohol-free and classic pairings lean on hibiscus, ginger, tiger nut and citrus.",
      image: images.drink,
    },
  ],
  gallery: [
    { src: images.hero, alt: "A plated main course lit by candlelight", className: "col-span-2 row-span-2" },
    { src: images.grill, alt: "Skewers cooking over open flames", className: "" },
    { src: images.interior, alt: "The main dining room with warm lighting", className: "" },
    { src: images.dessert, alt: "A dessert finished at the table", className: "row-span-2" },
    { src: images.pasta, alt: "Hand-rolled pasta with a glossy sauce", className: "" },
    { src: images.drink, alt: "A garnished alcohol-free cocktail", className: "col-span-2" },
  ],
};

export type Restaurant = typeof restaurant;