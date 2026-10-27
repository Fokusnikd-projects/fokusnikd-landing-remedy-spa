"use client";

import { useState } from "react";
import { IconPin } from "@/components/icons";
import { MAPS_EMBED_URL } from "@/lib/facts";

/**
 * The Google embed is about 1.9 MB, so it stays unloaded until the guest asks.
 * The still image is a styled drawing, not a Google or OpenStreetMap tile.
 */
export function MapFacade({ title, showLabel }: { title: string; showLabel: string }) {
  const [live, setLive] = useState(false);

  if (live) {
    return (
      <iframe
        title={title}
        src={MAPS_EMBED_URL}
        className="h-full min-h-[240px] w-full border-0 lg:min-h-[320px]"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLive(true)}
      className="relative flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 bg-[#E7E1D4] px-6 text-spa-text lg:min-h-[320px]"
    >
      <svg viewBox="0 0 320 200" className="h-40 w-full max-w-[320px]" aria-hidden>
        <rect width="320" height="200" fill="#E7E1D4" />
        <rect x="16" y="18" width="78" height="54" rx="4" fill="#F7F3EC" />
        <rect x="104" y="18" width="96" height="54" rx="4" fill="#EFE7DA" />
        <rect x="210" y="18" width="94" height="70" rx="4" fill="#F7F3EC" />
        <rect x="16" y="112" width="120" height="70" rx="4" fill="#EFE7DA" />
        <rect x="186" y="120" width="118" height="62" rx="4" fill="#F7F3EC" />
        <path d="M0 92 H320" stroke="#F7F3EC" strokeWidth="16" />
        <path d="M148 0 V200" stroke="#F7F3EC" strokeWidth="14" />
        <path d="M160 78 c0-18 28-18 28 2 0 16-14 20-14 32" fill="none" stroke="#2E4A3B" strokeWidth="4" />
        <circle cx="174" cy="122" r="5" fill="#2E4A3B" />
      </svg>
      <span className="text-[15px] font-semibold leading-5">35 Hai Bà Trưng</span>
      <span className="inline-flex h-11 items-center gap-2 rounded-full bg-spa-accent px-4 text-[15px] font-semibold text-spa-cream">
        <IconPin size={16} />
        {showLabel}
      </span>
    </button>
  );
}
