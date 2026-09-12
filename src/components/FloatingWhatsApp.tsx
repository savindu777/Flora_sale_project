import { BUSINESS_NAME, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(
        `Hello ${BUSINESS_NAME}! 🌸 I'd like to know more about your handmade floral crafts.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${BUSINESS_NAME} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-card px-4 py-2 text-sm text-foreground opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Chat with {BUSINESS_NAME}
      </span>
      <span className="animate-pulse-ring interactive-lift flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
