"use client";

import { useEffect, useState } from "react";
import { IconChat, IconPhone } from "@/components/icons";
import { MessengerLink } from "@/components/messenger-link";
import { useBooking } from "@/components/booking-context";
import { formatContinue } from "@/lib/dates";
import { TEL_URL } from "@/lib/facts";

function useFormPresence() {
  const [formInView, setFormInView] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);

  useEffect(() => {
    const form = document.getElementById("booking-details");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );
    observer.observe(form);
    const onFocusIn = (event: FocusEvent) => {
      setFieldFocused(form.contains(event.target as Node));
    };
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (!next || !form.contains(next)) setFieldFocused(false);
    };
    form.addEventListener("focusin", onFocusIn);
    form.addEventListener("focusout", onFocusOut);
    return () => {
      observer.disconnect();
      form.removeEventListener("focusin", onFocusIn);
      form.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return { formInView, fieldFocused };
}

export function BottomBar() {
  const { locale, t, date, time, slotsStatus, scrollToBooking, scrollToDetails } = useBooking();
  const { formInView, fieldFocused } = useFormPresence();

  if (fieldFocused) return null;
  if (time && slotsStatus === "ready") {
    if (formInView) return null;
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-spa-border bg-spa-bg px-4 pt-3 shadow-bar lg:hidden pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToDetails}
            className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center rounded-full bg-spa-accent px-4 text-[15px] font-semibold text-spa-cream"
          >
            {formatContinue(date, time, locale)}
          </button>
          <a
            href={TEL_URL}
            aria-label={t.callLabel}
            className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-spa-accent bg-spa-surface text-spa-accent"
          >
            <IconPhone size={20} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-spa-border bg-spa-bg px-4 pt-3 shadow-bar lg:hidden pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollToBooking()}
          className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center rounded-full bg-spa-accent px-3 text-[15px] font-semibold text-spa-cream"
        >
          {t.bookOnlineBar}
        </button>
        <MessengerLink className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent bg-spa-surface px-3 text-[15px] font-semibold text-spa-accent">
          <IconChat size={20} />
          {locale === "vi" ? t.channelZalo : t.channelWhatsapp}
        </MessengerLink>
        <a
          href={TEL_URL}
          aria-label={t.callLabel}
          className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-spa-accent bg-spa-surface text-spa-accent"
        >
          <IconPhone size={20} />
        </a>
      </div>
    </div>
  );
}
