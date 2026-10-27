"use client";

import { useBooking } from "@/components/booking-context";

export function Toast() {
  const { notice } = useBooking();
  if (!notice) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] left-1/2 z-[60] max-w-[90vw] -translate-x-1/2 rounded-full bg-spa-accent px-4 py-3 text-center text-[15px] font-semibold text-spa-cream shadow-bar lg:bottom-6"
    >
      {notice}
    </div>
  );
}
