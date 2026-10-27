"use client";

import { useEffect, useState } from "react";
import { IconClock } from "@/components/icons";
import { openNowLabel } from "@/lib/dates";
import type { Locale } from "@/lib/facts";

export function OpenNowChip({ locale }: { locale: Locale }) {
  const [label, setLabel] = useState(() => openNowLabel(locale));

  useEffect(() => {
    const update = () => setLabel(openNowLabel(locale));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <span
      suppressHydrationWarning
      className="inline-flex items-center gap-2 rounded-full border border-spa-border bg-spa-surface px-3 py-2 text-[15px] leading-[22px] text-spa-text"
    >
      <IconClock size={16} className="shrink-0 text-spa-gold-text" />
      {label}
    </span>
  );
}
