"use client";

import { IconCalendar, IconChat, IconCheck, IconClock, IconPin } from "@/components/icons";
import { useBooking } from "@/components/booking-context";
import { DemoNote } from "@/components/ui";
import { formatSummaryDate, icsStamp } from "@/lib/dates";
import {
  ADDRESS_STREET,
  ASSUMED_DURATION_MIN,
  MAPS_URL,
  messengerUrl,
  SPA_NAME,
} from "@/lib/facts";

function SummaryCard() {
  const { locale, t, serviceId, date, time } = useBooking();
  return (
    <div className="flex flex-col gap-3 rounded-md border border-spa-border bg-spa-surface p-4 text-base leading-6">
      <Row label={t.labelService} value={t.serviceName[serviceId]} />
      <Row label={t.labelDate} value={formatSummaryDate(date, locale)} />
      <Row label={t.labelTime} value={time ?? ""} />
      <Row label={t.labelDuration} value={t.duration} />
      <Row label={t.labelPrice} value={t.price} />
      <p className="flex items-center gap-2 border-t border-spa-border pt-2 text-spa-text">
        <IconPin size={20} className="shrink-0 text-spa-gold-text" />
        {t.summaryAddress}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-spa-muted">{label}</span>
      <span className="text-right font-semibold text-spa-text">{value}</span>
    </div>
  );
}

function downloadIcs(iso: string, time: string, service: string) {
  // TODO(demo): calendar file is generated in the browser. Nothing is uploaded.
  const start = icsStamp(iso, time);
  const end = icsStamp(iso, time, ASSUMED_DURATION_MIN);
  const description = "Demo booking — not a confirmed appointment.";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Remedy Spa//Demo//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${SPA_NAME} — ${service}`,
    `LOCATION:${ADDRESS_STREET}, Quận 1, Ho Chi Minh City`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "remedy-spa.ics";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function RequestSent() {
  const { locale, t, backToForm } = useBooking();
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4 px-6 py-8">
      <span className="flex size-14 items-center justify-center rounded-full bg-spa-sand text-spa-accent">
        <IconCheck size={20} />
      </span>
      <h1 className="font-display text-balance text-[40px] font-semibold leading-[48px] text-spa-text">{t.requestSentTitle}</h1>
      <p className="flex items-start gap-2 rounded-sm border border-spa-border bg-spa-surface px-3 py-2 text-[15px] leading-[22px] text-spa-text">
        <IconClock size={16} className="mt-0.5 shrink-0 text-spa-gold-text" />
        {t.waiting}
      </p>
      <p className="text-base font-semibold leading-6 text-spa-text">{t.requestNumber}</p>
      <p className="text-base leading-6 text-spa-text">{t.confirmChannel}</p>
      <SummaryCard />
      {/* TODO(confirm-with-spa): messenger link. Request number stays a placeholder, so the chat is not prefilled with a fake id. */}
      <a
        href={messengerUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-spa-accent px-6 text-[15px] font-semibold text-spa-cream"
      >
        <IconChat size={20} />
        {t.messageUs}
      </a>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent px-6 text-[15px] font-semibold text-spa-accent"
      >
        <IconPin size={20} />
        {t.getDirections}
      </a>
      <a
        href={messengerUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center text-[15px] font-semibold text-spa-accent"
      >
        {t.needChange}
      </a>
      <button type="button" onClick={backToForm} className="inline-flex h-11 items-center text-left text-[15px] font-semibold text-spa-text">
        {t.backHome}
      </button>
      <DemoNote>{t.requestDemoNote}</DemoNote>
    </div>
  );
}

export function BookingConfirmed() {
  const { locale, t, serviceId, date, time, backToForm } = useBooking();
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4 px-6 py-8">
      <span className="flex size-14 items-center justify-center rounded-full bg-spa-accent text-spa-cream">
        <IconCheck size={20} />
      </span>
      <h1 className="font-display text-balance text-[40px] font-semibold leading-[48px] text-spa-text">{t.confirmedTitle}</h1>
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-spa-gold bg-spa-accent px-3 py-2 text-[15px] font-semibold text-spa-cream">
        <IconCheck size={20} />
        {t.confirmedChip}
      </p>
      <p className="rounded-sm border border-dashed border-spa-gold px-2 py-1 text-[15px] leading-[22px] text-spa-text">
        {t.confirmedMessage}
      </p>
      <SummaryCard />
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-spa-accent px-6 text-[15px] font-semibold text-spa-cream"
      >
        <IconPin size={20} />
        {t.getDirections}
      </a>
      <button
        type="button"
        onClick={() => downloadIcs(date, time ?? "19:00", t.serviceName[serviceId])}
        className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent px-6 text-[15px] font-semibold text-spa-accent"
      >
        <IconCalendar size={20} />
        {t.addToCalendar}
      </button>
      <a
        href={messengerUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center text-[15px] font-semibold text-spa-accent"
      >
        {t.needChange}
      </a>
      <button type="button" onClick={backToForm} className="inline-flex h-11 items-center text-left text-[15px] font-semibold text-spa-text">
        {t.backHome}
      </button>
      <DemoNote>{t.confirmedNote}</DemoNote>
    </div>
  );
}
