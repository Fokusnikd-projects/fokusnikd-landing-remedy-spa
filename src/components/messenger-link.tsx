"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/booking-context";
import { bookingMessage, copyText, whatsappHref } from "@/lib/message";
import { TEL_URL, ZALO_URL, type Channel } from "@/lib/facts";

export function MessengerLink({
  channel,
  className,
  children,
}: {
  channel?: Channel;
  className?: string;
  children: ReactNode;
}) {
  const { locale, t, serviceId, date, time, name, showNotice } = useBooking();
  const which: Channel = channel ?? (locale === "vi" ? "zalo" : "whatsapp");
  const text = bookingMessage(locale, {
    service: t.serviceName[serviceId],
    dateIso: date,
    time,
    name,
  });

  if (which === "call") {
    return (
      <a href={TEL_URL} className={className}>
        {children}
      </a>
    );
  }

  if (which === "zalo") {
    return (
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(event) => {
          event.preventDefault();
          // TODO(confirm-with-spa): Zalo on this number is not confirmed. Zalo URLs cannot carry text.
          const copied = copyText(text);
          showNotice(copied ? t.copied : t.copyFailed);
          window.open(ZALO_URL, "_blank", "noopener,noreferrer");
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={whatsappHref(text)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
