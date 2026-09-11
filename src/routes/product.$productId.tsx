import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check, ChevronLeft, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  COLOR_OPTIONS,
  DELIVERY_OPTIONS,
  OCCASIONS,
  PICKUP_LOCATION,
  PRODUCTS,
  getProduct,
  isValidSriLankanPhone,
  normalizePhone,
  sendOrderToWhatsApp,
  type DeliveryMethod,
} from "@/lib/site-config";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found | Zara Blooms" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} | Zara Blooms`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description.slice(0, 155) },
        { property: "og:image", content: product.image },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();

  const [quantity, setQuantity] = useState(1);
  const [singleColor, setSingleColor] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondColor, setSecondColor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [otherOccasion, setOtherOccasion] = useState("");
  const [delivery, setDelivery] = useState<DeliveryMethod | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const effectiveSecond = singleColor ? primaryColor : secondColor;
  const resolvedOccasion = occasion === "Other" ? otherOccasion.trim() : occasion;

  const combination = useMemo(
    () =>
      primaryColor && effectiveSecond
        ? singleColor
          ? `${primaryColor} (single colour)`
          : `${primaryColor} + ${effectiveSecond}`
        : "",
    [primaryColor, effectiveSecond, singleColor],
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (quantity < 1) e['quantity'] = "Quantity must be at least 1.";
    if (!primaryColor) e['primaryColor'] = "Please select a primary color.";
    if (!effectiveSecond) e['secondColor'] = "Please select a second color or choose single color.";
    if (!resolvedOccasion) e['occasion'] = "Please choose your occasion.";
    if (!delivery) e['delivery'] = "Please select a delivery method.";
    if (!name.trim()) e['name'] = "Please enter your name.";
    if (!phone.trim()) e['phone'] = "Phone number is required.";
    else if (!isValidSriLankanPhone(phone))
      e['phone'] = "Enter a valid Sri Lankan mobile number (07XXXXXXXX).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    sendOrderToWhatsApp({
      productName: product.name,
      quantity,
      primaryColor,
      secondColor: effectiveSecond,
      occasion: resolvedOccasion,
      deliveryMethod: delivery as string,
      customerName: name.trim(),
      customerPhone: phone,
      specialRequest: request,
    });
    window.setTimeout(() => setSending(false), 1200);
  };

  const swatchList = (
    selected: string,
    onSelect: (c: string) => void,
    groupLabel: string,
    disabled = false,
  ) => (
    <div
      role="radiogroup"
      aria-label={groupLabel}
      className={`mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
    >
      {COLOR_OPTIONS.map((c) => {
        const active = selected === c.name;
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(c.name)}
            className="flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-secondary/60 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span
              style={{ backgroundColor: c.hex }}
              className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-border transition-all ${
                active ? "ring-2 ring-accent ring-offset-2 ring-offset-card" : ""
              }`}
            >
              {active && <Check className="h-4 w-4 text-foreground" />}
            </span>
            <span className="text-[11px] leading-tight text-muted-foreground">{c.name}</span>
          </button>
        );
      })}
    </div>
  );

  const fieldError = (key: string) =>
    errors[key] ? (
      <p role="alert" className="mt-2 text-xs text-destructive">
        {errors[key]}
      </p>
    ) : null;

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          hash="collection"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" /> Back to collection
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="eyebrow mt-6">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-5 text-lg text-foreground">
              Starting from <span className="font-medium">{product.startingPrice}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Quantity */}
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Quantity</h2>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span aria-live="polite" className="min-w-10 text-center font-display text-2xl">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </section>

            {/* Colors */}
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Choose Your Colors</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select up to two colors for your arrangement.
              </p>

              <h3 className="mt-6 text-sm font-medium text-foreground">Primary Color</h3>
              {swatchList(primaryColor, setPrimaryColor, "Primary color")}
              {fieldError("primaryColor")}

              <label className="mt-6 flex items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={singleColor}
                  onChange={(e) => setSingleColor(e.target.checked)}
                  className="h-4 w-4 accent-[var(--gold)]"
                />
                Single Color (use the primary color for both)
              </label>

              <h3 className="mt-6 text-sm font-medium text-foreground">Second Color</h3>
              {swatchList(effectiveSecond, setSecondColor, "Second color", singleColor)}
              {fieldError("secondColor")}

              {combination && (
                <p className="mt-5 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-foreground">
                  Your combination: <span className="font-medium">{combination}</span>
                </p>
              )}
            </section>

            {/* Occasion */}
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Choose Your Occasion</h2>
              <div role="radiogroup" aria-label="Occasion" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    role="radio"
                    aria-checked={occasion === o}
                    onClick={() => setOccasion(o)}
                    className={`rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      occasion === o
                        ? "border-accent bg-secondary text-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {occasion === "Other" && (
                <div className="mt-4">
                  <label htmlFor="other-occasion" className="text-sm text-foreground">
                    Please specify your occasion
                  </label>
                  <input
                    id="other-occasion"
                    value={otherOccasion}
                    onChange={(e) => setOtherOccasion(e.target.value)}
                    maxLength={80}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
              {fieldError("occasion")}
            </section>

            {/* Delivery */}
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Delivery Method</h2>
              <div role="radiogroup" aria-label="Delivery method" className="mt-4 space-y-3">
                {DELIVERY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={delivery === d.id}
                    onClick={() => setDelivery(d.id)}
                    className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      delivery === d.id
                        ? "border-accent bg-secondary/70"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{d.id}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {d.description}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-medium text-accent">{d.price}</span>
                  </button>
                ))}
              </div>
              {delivery === "Self Pickup" && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Self Pickup — FREE · Pickup location: {PICKUP_LOCATION}
                </p>
              )}
              {fieldError("delivery")}
            </section>

            {/* Customer details */}
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Your Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cust-name" className="text-sm text-foreground">
                    Customer Name
                  </label>
                  <input
                    id="cust-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  {fieldError("name")}
                </div>
                <div>
                  <label htmlFor="cust-phone" className="text-sm text-foreground">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    id="cust-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    placeholder="07XXXXXXXX"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  {fieldError("phone")}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="request" className="text-sm text-foreground">
                  Special Request (Optional)
                </label>
                <textarea
                  id="request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Add any special instructions for your order..."
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </section>

            {/* Summary */}
            <section className="rounded-3xl border border-accent/40 bg-blush-gradient p-6 shadow-soft">
              <h2 className="font-display text-xl text-foreground">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Product", product.name],
                  ["Quantity", String(quantity)],
                  ["Primary Color", primaryColor || "—"],
                  ["Second Color", effectiveSecond || "—"],
                  ["Occasion", resolvedOccasion || "—"],
                  ["Delivery Method", delivery || "—"],
                  ["Customer Name", name || "—"],
                  ["Contact Number", phone ? normalizePhone(phone) : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right text-foreground">{v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 pt-2">
                  <dt className="font-medium text-foreground">Estimated Total</dt>
                  <dd className="text-right text-foreground">
                    {product.startingPrice} × {quantity}
                    <span className="block text-xs text-muted-foreground">
                      Final price &amp; courier charge confirmed on WhatsApp
                    </span>
                  </dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform duration-200 hover:scale-[1.02] disabled:opacity-70"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {sending ? "Opening WhatsApp..." : "Send Order to WhatsApp"}
              </button>
              {Object.keys(errors).length > 0 && (
                <p role="alert" className="mt-3 text-center text-xs text-destructive">
                  Please complete the highlighted fields above.
                </p>
              )}
            </section>
          </form>
        </div>

        {/* Other products */}
        <section className="mt-20">
          <h2 className="font-display text-2xl text-foreground">You may also love</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
              <Link
                key={p.id}
                to="/product/$productId"
                params={{ productId: p.id }}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="eyebrow">{p.category}</p>
                  <p className="mt-1 font-display text-base text-foreground">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
