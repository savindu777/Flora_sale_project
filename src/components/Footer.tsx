import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import {
  BUSINESS_NAME,
  LOGO_URL,
  PICKUP_LOCATION,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "@/lib/site-config";
import { TikTokIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-blush-gradient">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={LOGO_URL}
              alt={`${BUSINESS_NAME} logo`}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-border"
            />
            <span className="font-display text-2xl text-foreground">{BUSINESS_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Handcrafted Blooms, Made to Be Remembered
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg text-foreground">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { label: "Home", hash: "top" },
              { label: "Collection", hash: "collection" },
              { label: "How to Order", hash: "how-to-order" },
              { label: "Reviews", hash: "reviews" },
              { label: "Contact", hash: "contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link to="/" hash={l.hash} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-foreground">Products</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" hash="collection" className="transition-colors hover:text-accent">
                Bouquets
              </Link>
            </li>
            <li>
              <Link to="/" hash="collection" className="transition-colors hover:text-accent">
                Baskets
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappLink(`Hello ${BUSINESS_NAME}! 🌸`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4" /> WhatsApp {WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {PICKUP_LOCATION}
            </li>
          </ul>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="interactive-lift mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground shadow-soft"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © 2026 {BUSINESS_NAME}. Crafted with love in Sri Lanka.
      </div>
    </footer>
  );
}
