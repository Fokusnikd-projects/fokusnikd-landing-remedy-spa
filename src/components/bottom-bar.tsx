"use client";

import { IconChat, IconPhone } from "@/components/icons";
import { useBooking } from "@/components/booking-context";
import { formatContinue } from "@/lib/dates";
import { messengerUrl, TEL_URL } from "@/lib/facts";

export function BottomBar() {
  const { locale, t, date, time, scrollToBooking, scrollToDetails } = useBooking();
  const messenger = messengerUrl(locale);

  if (time) {
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
        <a
          href={messenger}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent bg-spa-surface px-3 text-[15px] font-semibold text-spa-accent"
        >
          <IconChat size={20} />
          {locale === "vi" ? t.channelZalo : t.channelWhatsapp}
        </a>
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
