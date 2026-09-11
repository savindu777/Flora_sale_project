import { useEffect, useState } from "react";
import { BUSINESS_NAME, LOGO_URL } from "@/lib/site-config";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setHidden(true), 1500);
    const t2 = window.setTimeout(() => setGone(true), 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blush-gradient transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="zb-loader-ring animate-logo-in">
        <div className="zb-loader-ring__inner">
          <img
            src={LOGO_URL}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      <p className="mt-6 font-display text-2xl tracking-wide text-foreground sm:text-3xl">
        {BUSINESS_NAME}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Handmade with love in Sri Lanka</p>
    </div>
  );
}
