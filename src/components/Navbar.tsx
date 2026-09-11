import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BUSINESS_NAME, LOGO_URL, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV_LINKS = [
  { label: "Home", hash: "top" },
  { label: "Collection", hash: "collection" },
  { label: "How to Order", hash: "how-to-order" },
  { label: "Reviews", hash: "reviews" },
  { label: "Contact", hash: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-cream/95 backdrop-blur shadow-soft" : "border-transparent bg-cream/70 backdrop-blur"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" hash="top" className="flex min-w-0 items-center gap-3">
          <img
            src={LOGO_URL}
            alt={`${BUSINESS_NAME} logo`}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <span className="truncate font-display text-xl tracking-wide text-foreground sm:text-2xl">
            {BUSINESS_NAME}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to="/"
                  hash={l.hash}
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(`Hello ${BUSINESS_NAME}! 🌸`)}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-lift ml-2 hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>

          <a
            href={whatsappLink(`Hello ${BUSINESS_NAME}! 🌸`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us"
            className="interactive-lift inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground sm:hidden"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-border bg-cream transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to="/"
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-3 text-foreground/85 last:border-0"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
