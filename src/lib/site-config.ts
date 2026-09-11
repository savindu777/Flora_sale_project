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

export type ProductCategory = "Bouquets" | "Baskets";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  /** Edit prices here once final pricing is decided. */
  startingPrice: string;
  badge: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "blushing-bloom-bouquet",
    name: "Blushing Bloom Bouquet",
    category: "Bouquets",
    description:
      "A soft and romantic handmade bouquet designed with delicate floral details and a beautiful blush-inspired appearance. Perfect for birthdays, anniversaries, gifts, and heartfelt surprises.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdf25i5X2UdIyvGtvOgQcZLKtVn2feGDoVgX52mBoX2_6qtM4Cot-ZCRj&s=10",
    startingPrice: "LKR 4000",
    badge: "Bestseller",
  },
  {
    id: "eternal-blossom-bouquet",
    name: "Eternal Blossom Bouquet",
    category: "Bouquets",
    description:
      "An elegant handcrafted floral arrangement designed to bring timeless beauty to your special moments. Customize the colors to create a bouquet that feels uniquely yours.",
    image:
      "https://bloompoem.com/cdn/shop/files/O1CN016dGWWi27z8wBiOpix__4611686018427381307-0-fleamarket_jpg_790x10000Q90_jpg.webp?v=1780560163",
    startingPrice: "LKR 4500",
    badge: "Popular",
  },
  {
    id: "golden-petal-celebration-bouquet",
    name: "Golden Petal Celebration Bouquet",
    category: "Bouquets",
    description:
      "A charming handcrafted bouquet created for joyful celebrations. A beautiful choice for birthdays, anniversaries, Valentine's Day, weddings, and thoughtful gifts.",
    image: "https://www.sendabasket.com.au/images/products/large/hvq2m2rppt.jpg",
    startingPrice: "LKR 6000",
    badge: "New",
  },
  {
    id: "royal-blossom-gift-basket",
    name: "Royal Blossom Gift Basket",
    category: "Baskets",
    description:
      "A luxurious floral gift basket combining an elegant presentation with handmade floral craftsmanship. Ideal for memorable celebrations and premium gifting.",
    image: "https://img.staticdj.com/a3c022d43063d1534eed4c97f4b3cd31_750x.jpg",
    startingPrice: "LKR 3500",
    badge: "Featured",
  },
  {
    id: "sweet-garden-gift-basket",
    name: "Sweet Garden Gift Basket",
    category: "Baskets",
    description:
      "A beautiful handmade floral basket designed to make gifting extra special. Choose your preferred colors and create a personalized arrangement for someone you love.",
    image: "https://images.meesho.com/images/products/1003821716/jgukl_512.webp?width=512",
    startingPrice: "LKR 3000",
    badge: "Popular",
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
    name: "Customer Name 1",
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
