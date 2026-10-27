// ─────────────────────────────────────────────────────────────
//  MENU DATA — edit dishes, prices, descriptions and photos here.
//  Photos live in /public/images. Use the exact file name only.
//  ALL PRICES ARE SAMPLE VALUES in Nigerian naira (₦) for demonstration.
//  Dietary labels are sample data too: verify allergens for a real menu.
// ─────────────────────────────────────────────────────────────

export type CategoryId = "appetisers" | "mains" | "desserts" | "drinks";
export type DietaryTag = "V" | "VG" | "GF" | "Spicy";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number; 
  category: CategoryId;
  image: string; 
  tags?: DietaryTag[];
  featured?: boolean; 
}


const photo = (file: string) => `${import.meta.env.BASE_URL}images/${encodeURIComponent(file)}`;
export const menuNotice =
  "Sample menu for demonstration. All prices are illustrative placeholders in euros (€), not verified restaurant prices.";

export const menuHeroImage = photo("Grilled  Rebaye Steak.jpg");

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "appetisers", label: "Appetisers", blurb: "Small plates to begin, made for sharing." },
  { id: "mains", label: "Main Courses", blurb: "Generous plates from the grill, the pan and the pot." },
  { id: "desserts", label: "Desserts", blurb: "A sweet finish, served at the table." },
  { id: "drinks", label: "Drinks", blurb: "Fresh, chilled and alcohol-free." },
];

export const dietaryLabels: Record<DietaryTag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten free",
  Spicy: "Spicy",
};

export const dishes: Dish[] = [
  // ── Appetisers ──────────────────────────────────────────────
  {
    id: "beef-suya-skewers",
    name: "Beef Suya Skewers",
    description: "Flame-grilled beef skewers rubbed with yaji spice, served with sliced onion and tomato.",
    price: 7500,
    category: "appetisers",
    image: photo("Beef Suya Skewers.jpg"),
    tags: ["Spicy"],
    featured: true,
  },
  {
    id: "crispy-calamari",
    name: "Crispy Calamari",
    description: "Lightly battered squid, fried until golden, with lemon and a herbed dipping sauce.",
    price: 8500,
    category: "appetisers",
    image: photo("Crispy Calamari.jpg"),
    featured: true,
  },
  {
    id: "tomato-basil-bruschetta",
    name: "Tomato Basil Bruschetta",
    description: "Toasted bread topped with ripe tomato, fresh basil, garlic and olive oil.",
    price: 6000,
    category: "appetisers",
    image: photo("Tomato Basil Bruschetta.jpg"),
    tags: ["V"],
  },
  {
    id: "vegetable-spring-rolls",
    name: "Vegetable Spring Rolls",
    description: "Crisp golden rolls filled with seasonal vegetables, served with a sweet chilli dip.",
    price: 6500,
    category: "appetisers",
    image: photo("Vegetable spring rolls.jpg"),
    tags: ["V"],
  },
  {
    id: "seasoned-potato-wedges",
    name: "Seasoned Potato Wedges",
    description: "Thick-cut wedges, oven-roasted with house seasoning and served hot.",
    price: 5000,
    category: "appetisers",
    image: photo("Seasoned Potato Wedges.jpg"),
    tags: ["V"],
  },

  // ── Main courses ────────────────────────────────────────────
  {
    id: "grilled-ribeye",
    name: "Grilled Ribeye Steak",
    description: "Chargrilled ribeye cooked to your preference, finished with a rich pan sauce.",
    price: 32000,
    category: "mains",
    image: photo("Grilled  Rebaye Steak.jpg"),
    featured: true,
  },
  {
    id: "nigerian-jollof",
    name: "Nigerian Jollof",
    description: "Smoky party-style jollof rice in a deep tomato and pepper base.",
    price: 14500,
    category: "mains",
    image: photo("Nigerian jollof.jpg"),
    tags: ["Spicy"],
    featured: true,
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description: "Fillet of salmon grilled until just cooked, with lemon and seasonal sides.",
    price: 27500,
    category: "mains",
    image: photo("Grilled Salmon.jpg"),
  },
  {
    id: "nigerian-fried-rice",
    name: "Nigerian Fried Rice",
    description: "Fragrant fried rice with colourful vegetables and a gentle curry warmth.",
    price: 15000,
    category: "mains",
    image: photo("Nigeria fried rice is ready.jpg"),
  },
  {
    id: "garlic-prawn-pasta",
    name: "Creamy Garlic Prawn Pasta",
    description: "Plump prawns and pasta tossed in a silky garlic cream sauce.",
    price: 22000,
    category: "mains",
    image: photo("Creamy Garlic Prawn Pasta.jpg"),
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo with Broccoli",
    description: "Tender chicken and broccoli folded through pasta in a creamy parmesan Alfredo.",
    price: 19000,
    category: "mains",
    image: photo("🥦 Creamy Chicken Alfredo Pasta with Broccoli….jpg"),
  },
  {
    id: "gourmet-beef-burger",
    name: "Gourmet Beef Burger",
    description: "A thick beef patty, melted cheese and fresh toppings in a toasted bun.",
    price: 17500,
    category: "mains",
    image: photo("Gourmet Beef Burger.jpg"),
  },
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    description: "Tomato, mozzarella and basil on a crisp, blistered base.",
    price: 14000,
    category: "mains",
    image: photo("Easy Cheese and Tomato Pizza (Margherita Pizza).jpg"),
    tags: ["V"],
  },

  // ── Desserts ────────────────────────────────────────────────
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    description: "A warm chocolate cake with a molten centre, served with berry compote.",
    price: 8500,
    category: "desserts",
    image: photo("Cake and dessert  recipes _ Chocolate Lava Cake with Berry Compote _ Facebook.jpg"),
    tags: ["V"],
    featured: true,
  },
  {
    id: "creme-brulee",
    name: "Crème Brûlée",
    description: "Silky vanilla custard beneath a thin, crackling caramel crust.",
    price: 8000,
    category: "desserts",
    image: photo("Crème Brûlée.jpg"),
    tags: ["V"],
    featured: true,
  },
  {
    id: "classic-cheesecake",
    name: "Classic Cheesecake",
    description: "Smooth baked cheesecake on a buttery biscuit base.",
    price: 7500,
    category: "desserts",
    image: photo("Classic Cheesecake.jpg"),
    tags: ["V"],
  },
  {
    id: "french-apple-tart",
    name: "French Apple Tart",
    description: "Thinly sliced apples over crisp pastry, glazed until golden.",
    price: 8000,
    category: "desserts",
    image: photo("French Apple Tart.jpg"),
    tags: ["V"],
  },

  // ── Drinks (alcohol-free) ───────────────────────────────────
  {
    id: "strawberry-lemonade",
    name: "Strawberry Lemonade",
    description: "Fresh lemon and ripe strawberry, poured over ice.",
    price: 4500,
    category: "drinks",
    image: photo("Strawberry Lemonade.jpg"),
    tags: ["VG"],
    featured: true,
  },
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    description: "Mint, lime and coconut over crushed ice, topped with sparkling water.",
    price: 5000,
    category: "drinks",
    image: photo("Virgin Mojito Mocktail Recipe 🥥🌿 _ Easy Coconut Mojito.jpg"),
    tags: ["VG"],
    featured: true,
  },
  {
    id: "matcha-iced-latte",
    name: "Matcha Iced Latte",
    description: "Whisked matcha and chilled milk over ice.",
    price: 5500,
    category: "drinks",
    image: photo("Matcha Iced Latte_A refreshing drink perfect for….jpg"),
    tags: ["V"],
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    description: "Slow-brewed coffee served cold over ice.",
    price: 4500,
    category: "drinks",
    image: photo("Iced coffee.jpg"),
    tags: ["V"],
  },
  {
    id: "chocolate-milkshake",
    name: "Chocolate Milkshake",
    description: "Thick and creamy, blended with rich chocolate.",
    price: 5500,
    category: "drinks",
    image: photo("Chocolate Milkshake.jpg"),
    tags: ["V"],
  },
  {
    id: "fresh-orange-juice",
    name: "Fresh Orange Juice",
    description: "Pressed to order, served chilled.",
    price: 3500,
    category: "drinks",
    image: photo("Fresh Orange Juice.jpg"),
    tags: ["VG"],
  },
];
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);