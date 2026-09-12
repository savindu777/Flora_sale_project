/* ------------------------------------------------------------------
 * Central configuration — edit everything about the business here.
 * ------------------------------------------------------------------ */

export const BUSINESS_NAME = "Zara Blooms";
export const TAGLINE = "Handcrafted Blooms, Made Just for You";
export const DESCRIPTION =
  "Beautiful handmade and customized floral crafts designed for birthdays, anniversaries, weddings, gifts, Valentine's Day, and every special moment.";

/** WhatsApp number in international format, digits only (no + or spaces). */
export const WHATSAPP_NUMBER = "94702655501";
export const TIKTOK_URL = "https://www.tiktok.com/en/";
export const PICKUP_LOCATION = "Colombo, Sri Lanka";
/** Shared Zara Blooms logo used in navigation, footer, favicon and preloader. */
export const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/* ------------------------------ Products ------------------------------ */

export type ProductCategory = "Bouquets" | "Baskets" | "Mini Pots";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  /** Extra product photographs displayed on the product page. */
  images?: string[];
  startingPrice: string;
  priceNote?: string;
  badge: string;
};

const productImage = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

export const PRODUCTS: Product[] = [
  {
    id: "mini-orange-daisy-pot",
    name: "Mini Orange Daisy Pot",
    category: "Mini Pots",
    description:
      "A cheerful handmade daisy arrangement in a petite pot, finished with curled green stems. A bright little gift for desks, shelves, and thoughtful surprises.",
    image: productImage("mini-orange-daisy-pot.jpeg"),
    startingPrice: "Rs. 450",
    priceNote: "Rs. 375 each for 20 or more",
    badge: "Mini pot",
  },
  {
    id: "mini-white-daisy-pot",
    name: "Mini White Daisy Pot",
    category: "Mini Pots",
    description:
      "A sweet handmade cluster of white daisies in a compact pot. Its fresh, sunny look makes it a lovely small gift or decorative keepsake.",
    image: productImage("mini-white-daisy-pot.jpeg"),
    startingPrice: "Rs. 450",
    priceNote: "Rs. 375 each for 20 or more",
    badge: "Mini pot",
  },
  {
    id: "mini-pink-tulip-pot",
    name: "Mini Pink Tulip Pot",
    category: "Mini Pots",
    description:
      "A handcrafted mini tulip pot with soft pink blooms and a ribbon-finished base. A charming choice for birthdays, thank-yous, and everyday gifting.",
    image: productImage("mini-pink-tulip-pot.jpeg"),
    startingPrice: "Rs. 600",
    priceNote: "Rs. 500 each for 20 or more",
    badge: "Mini tulip pot",
  },
  {
    id: "mini-sunshine-tulip-pot",
    name: "Mini Sunshine Tulip Pot",
    category: "Mini Pots",
    description:
      "A warm yellow-and-orange handmade tulip arrangement in a ribbon-finished pot. Made to bring a little sunshine to someone special.",
    image: productImage("mini-sunshine-tulip-pot.jpeg"),
    startingPrice: "Rs. 600",
    priceNote: "Rs. 500 each for 20 or more",
    badge: "Mini tulip pot",
  },
  {
    id: "pink-flower-bouquet",
    name: "Pink Flower Bouquet",
    category: "Bouquets",
    description:
      "A statement bouquet of handmade pink lilies, tulips, and delicate accent flowers, wrapped in soft blush paper and finished with a red bow.",
    image: productImage("pink-flower-bouquet.jpeg"),
    images: [
      productImage("pink-flower-bouquet.jpeg"),
      productImage("pink-flower-bouquet-front.jpeg"),
      productImage("pink-flower-bouquet-closeup.jpeg"),
      productImage("pink-flower-bouquet-detail.jpeg"),
    ],
    startingPrice: "Rs. 2,200",
    badge: "Featured",
  },
  {
    id: "large-strawberry-basket",
    name: "Large Strawberry Basket",
    category: "Baskets",
    description:
      "A large handmade hanging basket filled with bright strawberries, leafy vines, and tiny white flowers. A playful statement piece for gifting or decorating.",
    image: productImage("large-strawberry-basket-front.jpeg"),
    images: [
      productImage("large-strawberry-basket-front.jpeg"),
      productImage("large-strawberry-basket-detail.jpeg"),
      productImage("large-strawberry-basket-side.jpeg"),
      productImage("large-strawberry-basket-outdoor.jpeg"),
      productImage("large-strawberry-basket.jpeg"),
    ],
    startingPrice: "Rs. 2,500",
    badge: "Featured",
  },
  {
    id: "large-red-rose-bouquet",
    name: "Large Red Rose Bouquet",
    category: "Bouquets",
    description:
      "A dramatic bouquet of five medium-sized handmade red roses, layered with soft white wrapping and delicate floral accents for a memorable romantic gift.",
    image: productImage("large-red-rose-bouquet.jpeg"),
    startingPrice: "Rs. 4,500",
    priceNote: "Includes 5 medium-sized flowers",
    badge: "Large bouquet",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

/* ------------------------------ Colors ------------------------------ */

export type ColorOption = { name: string; hex: string };

export const COLOR_OPTIONS: ColorOption[] = [
  { name: "Blush Pink", hex: "#F2D3D0" },
  { name: "Baby Pink", hex: "#F8C8DC" },
  { name: "Rose Pink", hex: "#E38BA0" },
  { name: "Red", hex: "#C62828" },
  { name: "Burgundy", hex: "#7B1F32" },
  { name: "Lavender", hex: "#D9C7D8" },
  { name: "Purple", hex: "#7E57C2" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Cream", hex: "#FFF6E8" },
  { name: "Peach", hex: "#FFCBA4" },
  { name: "Coral", hex: "#FF7F6B" },
  { name: "Baby Blue", hex: "#BFDCEB" },
  { name: "Royal Blue", hex: "#2A4C9B" },
  { name: "Yellow", hex: "#F6D060" },
  { name: "Sage Green", hex: "#B2C2A6" },
  { name: "Emerald Green", hex: "#1E7A50" },
  { name: "Champagne", hex: "#EFE0C4" },
  { name: "Gold", hex: "#C8A46B" },
];

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Gift",
  "Valentine's",
  "Other",
] as const;

export type DeliveryMethod = "Self Pickup" | "Courier Service";

export const DELIVERY_OPTIONS: {
  id: DeliveryMethod;
  description: string;
  price: string;
}[] = [
  {
    id: "Self Pickup",
    description: `Collect your order from our delivery/pickup place (${PICKUP_LOCATION})`,
    price: "FREE",
  },
  {
    id: "Courier Service",
    description: "Island-wide delivery through courier service",
    price: "To be confirmed",
  },
];

/* ---------------------------- Testimonials ---------------------------- */

export const REVIEWS = [
  {
    name: "perera",
    location: "Colombo",
    text: "Absolutely beautiful craftsmanship. The colors were exactly what I wanted and the bouquet looked even better in person.",
  },
  {
    name: "Customer Name 2",
    location: "Kandy",
    text: "Such a thoughtful handmade gift. The customization made it feel really personal.",
  },
  {
    name: "Customer Name 3",
    location: "Galle",
    text: "Beautiful work and excellent communication. Highly recommended for special occasions.",
  },
];

/* --------------------------- Order message --------------------------- */

export type OrderDetails = {
  productName: string;
  quantity: number;
  primaryColor: string;
  secondColor: string;
  occasion: string;
  deliveryMethod: string;
  customerName: string;
  customerPhone: string;
  specialRequest?: string;
};

/** Normalize Sri Lankan mobile numbers for display (e.g. 0771234567). */
export const normalizePhone = (raw: string) => {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("94") && digits.length === 11) return `0${digits.slice(2)}`;
  if (digits.length === 9) return `0${digits}`;
  return digits;
};

export const isValidSriLankanPhone = (raw: string) => {
  const n = normalizePhone(raw);
  return /^07\d{8}$/.test(n);
};

/** Single source of truth for the WhatsApp order message. */
export const buildOrderMessage = (o: OrderDetails) => {
  const lines = [
    `Hello ${BUSINESS_NAME}! 🌸`,
    "",
    "I would like to place an order.",
    "",
    `Product: ${o.productName}`,
    `Quantity: ${o.quantity}`,
    `Primary Color: ${o.primaryColor}`,
    `Second Color: ${o.secondColor}`,
    `Occasion: ${o.occasion}`,
    `Delivery Method: ${o.deliveryMethod}`,
    `Customer Name: ${o.customerName}`,
    `Customer Contact Number: ${normalizePhone(o.customerPhone)}`,
  ];
  if (o.specialRequest?.trim()) {
    lines.push("", "Special Request:", o.specialRequest.trim());
  }
  lines.push("", "Thank you! 🌷");
  return lines.join("\n");
};

export const sendOrderToWhatsApp = (o: OrderDetails) => {
  window.open(whatsappLink(buildOrderMessage(o)), "_blank", "noopener,noreferrer");
};
