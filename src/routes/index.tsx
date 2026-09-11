import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Gift,
  Hand,
  Heart,
  MapPin,
  Palette,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  BUSINESS_NAME,
  DESCRIPTION,
  PICKUP_LOCATION,
  PRODUCTS,
  REVIEWS,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zara Blooms | Handmade Floral Bouquets & Gift Baskets Sri Lanka" },
      {
        name: "description",
        content:
          "Handcrafted, customizable bouquets and floral gift baskets made in Sri Lanka. Choose your colours, occasion and delivery, then order on WhatsApp.",
      },
      { property: "og:title", content: "Zara Blooms | Handmade Customized Floral Crafts" },
      {
        property: "og:description",
        content:
          "Handmade bouquets and floral gift baskets, customized in your favourite colours for every special moment.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Hand, title: "Handmade Quality", text: "Every piece is carefully handcrafted" },
  { icon: Palette, title: "Fully Customizable", text: "Choose the colors you love" },
  { icon: Sparkles, title: "Two-Color Designs", text: "Create beautiful color combinations" },
  { icon: Gift, title: "Perfect for Gifts", text: "Made for every special occasion" },
  { icon: Heart, title: "Sri Lankan Handmade", text: "Crafted locally with care" },
  { icon: Phone, title: "Easy WhatsApp Ordering", text: "Send your customized order directly" },
];

const STEPS = [
  {
    title: "Browse & Choose",
    text: "Explore our handmade bouquets and baskets and choose your favorite design.",
  },
  {
    title: "Customize",
    text: "Select your quantity, two preferred colors, occasion, and delivery method.",
  },
  {
    title: "Order on WhatsApp",
    text: `Send your complete customized order directly to ${BUSINESS_NAME} through WhatsApp.`,
  },
];

const FILTERS = ["All", "Bouquets", "Baskets"] as const;

function Home() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const products = PRODUCTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <main id="top">
      {/* Hero */}
      <section className="relative overflow-hidden bg-blush-gradient">
        <div
          aria-hidden="true"
          className="animate-petal-drift pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lavender/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-pink-soft/60 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal>
            <p className="eyebrow">Handcrafted in Sri Lanka</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              Beautiful Blooms,
              <br />
              <span className="italic text-gold-gradient">Made to Be Remembered</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Discover handmade customized bouquets and floral gift baskets, thoughtfully crafted
              for your most special moments.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#collection"
                className="interactive-lift rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft"
              >
                Explore Collection
              </a>
              <a
                href={whatsappLink(`Hello ${BUSINESS_NAME}! 🌸 I'd like to place an order.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-lift inline-flex items-center gap-2 rounded-full border border-accent bg-card px-7 py-3.5 text-sm font-medium text-foreground shadow-soft"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-border/70 bg-card p-5 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-accent">
                  <f.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 min-w-0">
                  <h3 className="font-display text-base text-foreground">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Our Collection</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl text-foreground sm:text-4xl">
              Handcrafted Blooms for Every Occasion
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Choose a bouquet or basket and make it uniquely yours with your favorite colors,
              quantity, occasion, and delivery method.
            </p>
          </Reveal>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-6 py-2.5 text-sm transition-colors ${
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="zb-product-card group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-accent-foreground">
                      {p.badge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{p.name}</h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <p className="mt-5 text-sm text-foreground">
                      Starting from <span className="font-medium">{p.startingPrice}</span>
                    </p>
                    <Link
                      to="/product/$productId"
                      params={{ productId: p.id }}
                      className="interactive-lift mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                    >
                      Customize &amp; Order
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section id="how-to-order" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Simple Steps</p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">How to Order</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Your perfect handmade arrangement is just a few steps away.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative h-full rounded-3xl border border-border/70 bg-card p-8 text-center shadow-soft">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary font-display text-xl text-foreground ring-1 ring-accent/50">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Happy Customers
            </h2>
          </Reveal>
          <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 80} className="min-w-[280px] snap-center md:min-w-0">
                <figure className="h-full rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 font-display text-lg text-foreground">
                    {r.name}
                    <span className="block text-xs font-sans text-muted-foreground">
                      {r.location}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blush-gradient py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Let's Create Something Beautiful
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Have a special request or want a custom floral arrangement? Send us a message on
              WhatsApp.
            </p>
            <a
              href={whatsappLink(`Hello ${BUSINESS_NAME}! 🌸 I have a custom request.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-lift mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-soft"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <dl className="mt-12 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <dt className="eyebrow">Phone / WhatsApp</dt>
                <dd className="mt-2 flex items-center justify-center gap-2 text-sm text-foreground">
                  <Phone className="h-4 w-4" /> {WHATSAPP_NUMBER}
                </dd>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <dt className="eyebrow">Location</dt>
                <dd className="mt-2 flex items-center justify-center gap-2 text-sm text-foreground">
                  <MapPin className="h-4 w-4" /> {PICKUP_LOCATION}
                </dd>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-soft">
                <dt className="eyebrow">Business</dt>
                <dd className="mt-2 text-sm text-foreground">{BUSINESS_NAME}</dd>
              </div>
            </dl>
            <p className="mt-10 text-xs text-muted-foreground">{DESCRIPTION}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
