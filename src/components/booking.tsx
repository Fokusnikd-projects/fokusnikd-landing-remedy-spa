"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { IconAlert, IconCheck, IconChevronDown, IconChevronLeft, IconChevronRight, IconClock } from "@/components/icons";
import { useBooking } from "@/components/booking-context";
import { MessengerLink } from "@/components/messenger-link";
import { Container, DemoNote, SectionHeading } from "@/components/ui";
import { channelLabel, channelOrder } from "@/lib/copy";
import { DIAL_OPTIONS } from "@/lib/dial";
import {
  bookingDates,
  formatDesktopToday,
  formatMonthTitle,
  formatShortDay,
  formatStripCaption,
  formatSummaryDate,
  isFullyBooked,
  monthGrid,
  nextFreeDate,
  shiftMonth,
  slotsForDate,
  splitIso,
  stripLabel,
  weekdayHeaders,
  type SlotGroupId,
} from "@/lib/dates";
import { SERVICES, type Channel } from "@/lib/facts";
import { cx } from "@/lib/cx";

export function Booking() {
  const { locale, t, showNotes } = useBooking();
  return (
    <section id="booking" className="scroll-mt-24 bg-spa-surface py-12 lg:py-16">
      <Container className="flex flex-col gap-4 lg:gap-6">
        <SectionHeading locale={locale} overline={t.bookingOverline} title={t.bookingTitle} />
        {showNotes ? <DemoNote>{t.demoBanner}</DemoNote> : null}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
            <ServiceStep />
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
              <DateStep />
              <TimeStep />
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:w-[400px] lg:shrink-0 lg:overflow-y-auto">
            <SummaryStep />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-spa-border bg-spa-bg p-4">
      <h3 className="font-display text-[20px] font-semibold leading-7 text-spa-text">{title}</h3>
      {children}
    </div>
  );
}

function ServiceStep() {
  const { t, serviceId, setServiceId } = useBooking();
  return (
    <Card title={t.stepService}>
      <div role="radiogroup" aria-label={t.stepService} className="flex flex-wrap gap-2">
        {SERVICES.filter((service) => service.real).map((service) => {
          const selected = service.id === serviceId;
          return (
            <button
              key={service.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setServiceId(service.id)}
              className={cx(
                "inline-flex min-h-[52px] items-center gap-2 rounded-full border px-4 py-2 text-left text-[15px] font-semibold leading-5",
                selected
                  ? "border-spa-accent bg-spa-accent text-spa-cream"
                  : "border-spa-border-strong bg-spa-surface text-spa-text",
              )}
            >
              {selected ? <IconCheck size={20} /> : null}
              {t.serviceName[service.id]}
            </button>
          );
        })}
      </div>
      <p className="flex items-center gap-2 text-[15px] leading-[22px] text-spa-muted">
        <IconClock size={16} className="text-spa-gold-text" />
        {t.serviceMeta}
      </p>
    </Card>
  );
}

function DateStep() {
  const { locale, t, clock, date, setDate, month, setMonth } = useBooking();
  const dates = bookingDates(clock.todayIso);
  const scroller = useRef<HTMLDivElement>(null);

  // Scroll the strip only. scrollIntoView would move the window to this step on load.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const selected = el.querySelector<HTMLElement>("[data-selected='true']");
    if (!selected || selected.offsetLeft + selected.offsetWidth <= el.clientWidth) {
      el.scrollLeft = 0;
      return;
    }
    el.scrollLeft = Math.max(0, selected.offsetLeft - 8);
  }, [date]);

  const scrollStrip = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  };

  return (
    <Card title={t.stepDate}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-base font-semibold leading-6 text-spa-text">{formatMonthTitle(month, locale)}</p>
        <div className="flex gap-2 lg:hidden">
          <button
            type="button"
            aria-label={t.earlierDates}
            onClick={() => scrollStrip(-1)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-spa-border-strong bg-spa-surface text-spa-accent"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label={t.laterDates}
            onClick={() => scrollStrip(1)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-spa-border-strong bg-spa-surface text-spa-accent"
          >
            <IconChevronRight size={20} />
          </button>
        </div>
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            aria-label={t.previousMonth}
            onClick={() => setMonth(shiftMonth(month, -1))}
            className="inline-flex size-11 items-center justify-center rounded-full border border-spa-border-strong bg-spa-surface text-spa-accent"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label={t.nextMonth}
            onClick={() => setMonth(shiftMonth(month, 1))}
            className="inline-flex size-11 items-center justify-center rounded-full border border-spa-border-strong bg-spa-surface text-spa-accent"
          >
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div
          ref={scroller}
          className="flex gap-2 overflow-x-auto pb-1 [overflow-anchor:none]"
          role="radiogroup"
          aria-label={t.stepDate}
        >
          {dates.map((iso) => (
            <DateCell key={iso} iso={iso} selected={iso === date} onSelect={setDate} showWeekday />
          ))}
        </div>
        <p className="mt-3 text-[13px] leading-[18px] text-spa-muted">
          {formatStripCaption(dates[0], dates[dates.length - 1], locale)}
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-7 gap-2 text-center">
          {weekdayHeaders(locale).map((label) => (
            <p
              key={label}
              className={cx(
                "py-1 text-[12px] font-semibold leading-4 text-spa-muted",
                locale === "en" && "uppercase tracking-[0.12em]",
              )}
            >
              {label}
            </p>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-2" role="radiogroup" aria-label={t.stepDate}>
          {monthGrid(month).map((iso, index) =>
            iso ? (
              <DateCell key={iso} iso={iso} selected={iso === date} onSelect={setDate} showWeekday={false} />
            ) : (
              <span key={`blank-${index}`} />
            ),
          )}
        </div>
        <p className="mt-3 text-[13px] leading-[18px] text-spa-muted">{formatDesktopToday(clock.todayIso, locale)}</p>
      </div>
    </Card>
  );
}

function DateCell({
  iso,
  selected,
  onSelect,
  showWeekday,
}: {
  iso: string;
  selected: boolean;
  onSelect: (iso: string) => void;
  showWeekday: boolean;
}) {
  const { locale, clock } = useBooking();
  const booked = isFullyBooked(iso);
  const past = iso < clock.realIso || iso < clock.todayIso;
  const { day } = splitIso(iso);
  const label = stripLabel(iso, clock.todayIso, locale);

  if (past) {
    return (
      <span
        aria-disabled="true"
        className={cx(
          "inline-flex flex-col items-center justify-center rounded-sm px-1 py-2 text-spa-muted",
          showWeekday ? "h-16 min-w-[76px] shrink-0" : "h-11 min-w-11 w-full",
        )}
      >
        {showWeekday ? <span className="text-[12px] font-semibold leading-4">{label}</span> : null}
        <span className="text-[15px] font-semibold leading-5">{day}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-selected={selected ? "true" : undefined}
      onClick={() => onSelect(iso)}
      className={cx(
        "inline-flex flex-col items-center justify-center rounded-sm border px-1 py-2 font-semibold",
        showWeekday ? "h-16 min-w-[76px] shrink-0 whitespace-nowrap" : "h-11 min-w-11 w-full",
        selected
          ? "border-spa-accent bg-spa-accent text-spa-cream"
          : booked
            ? "border-spa-booked bg-spa-booked text-spa-booked-text"
            : "border-spa-border-strong bg-spa-surface text-spa-text",
      )}
    >
      {showWeekday ? (
        <span
          className={cx(
            "text-[12px] leading-4",
            locale === "en" && "uppercase tracking-[0.04em]",
          )}
        >
          {label}
        </span>
      ) : null}
      <span className={cx("text-[15px] leading-5", booked && !selected && "line-through")}>{day}</span>
    </button>
  );
}

function TimeStep() {
  const { locale, t, clock, date, setDate, time, setTime, slotsStatus, showNotes, takenNotice, racedKeys, retrySlots } =
    useBooking();
  const full = isFullyBooked(date);
  const slots = slotsForDate(date, clock).map((slot) => ({
    ...slot,
    booked: slot.booked || racedKeys.includes(`${date}|${slot.label}`),
  }));
  const groups: SlotGroupId[] = ["morning", "afternoon", "evening"];
  const groupLabel: Record<SlotGroupId, string> = {
    morning: t.groupMorning,
    afternoon: t.groupAfternoon,
    evening: t.groupEvening,
  };
  const next = full ? nextFreeDate(date, clock) : null;

  return (
    <div id="booking-time" className="min-w-0 flex-1 scroll-mt-24">
      <Card title={t.stepTime}>
        <p className="text-[15px] leading-[22px] text-spa-muted">{t.timeZoneNote}</p>
        <div className="flex flex-wrap gap-4 text-[13px] leading-[18px] text-spa-text">
          <Legend swatch="available" label={t.legendAvailable} />
          <Legend swatch="booked" label={t.legendBooked} />
          <Legend swatch="selected" label={t.legendSelected} />
        </div>
        {slotsStatus === "loading" ? (
          <div role="status">
            <div className="grid grid-cols-4 gap-2" aria-hidden>
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className="h-11 animate-pulse rounded-sm bg-spa-skeleton" />
              ))}
            </div>
            <p className="mt-2 text-[13px] leading-[18px] text-spa-muted">{t.loadingTimes}</p>
          </div>
        ) : null}
        {slotsStatus === "error" ? (
          <div role="alert" className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-[15px] leading-[22px] text-spa-error">
              <IconAlert className="shrink-0" />
              {t.slotsError}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={retrySlots}
                className="inline-flex h-[52px] min-w-[8rem] flex-1 items-center justify-center rounded-full border-[1.5px] border-spa-accent px-4 text-[15px] font-semibold text-spa-accent"
              >
                {t.tryAgain}
              </button>
              <MessengerLink className="inline-flex h-[52px] min-w-[8rem] flex-1 items-center justify-center rounded-full border-[1.5px] border-spa-accent px-4 text-center text-[15px] font-semibold text-spa-accent">
                {t.slotsErrorAction}
              </MessengerLink>
            </div>
          </div>
        ) : null}
        {slotsStatus === "ready" && full ? (
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-[22px] text-spa-text">
              {next
                ? t.fullyBooked(formatShortDay(date, locale), formatShortDay(next.iso, locale), next.time)
                : t.legendBooked}
            </p>
            {next ? (
              <button
                type="button"
                onClick={() => setDate(next.iso)}
                className="inline-flex h-[52px] items-center justify-center rounded-full border-[1.5px] border-spa-accent px-6 text-[15px] font-semibold text-spa-accent"
              >
                {t.showNext(formatShortDay(next.iso, locale))}
              </button>
            ) : null}
          </div>
        ) : null}
        {takenNotice ? (
          <p role="alert" className="flex items-start gap-2 text-[15px] leading-[22px] text-spa-error">
            <IconAlert className="mt-0.5 shrink-0" />
            {t.slotTaken}
          </p>
        ) : null}
        {slotsStatus === "ready" && !full ? (
          <div className="flex flex-col gap-4">
            {groups.map((group) => {
              const items = slots.filter((slot) => slot.group === group);
              // Groups already past on the real Vietnam today have no slots left, so they collapse.
              if (items.length === 0) return null;
              return (
                <div key={group} className="flex flex-col gap-2">
                  <p className="text-[15px] font-semibold leading-5 text-spa-text">{groupLabel[group]}</p>
                  <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label={groupLabel[group]}>
                    {items.map((slot) => (
                      <SlotButton
                        key={slot.label}
                        label={slot.label}
                        booked={slot.booked}
                        selected={time === slot.label}
                        onSelect={() => setTime(slot.label)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        {showNotes ? (
          <p className="rounded-sm border border-dashed border-spa-gold bg-spa-sand px-3 py-2 text-[13px] leading-[18px] text-spa-muted">
            {t.slotNote}
          </p>
        ) : null}
      </Card>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: "available" | "booked" | "selected"; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cx(
          "size-3.5 rounded-[3px] border",
          swatch === "available" && "border-spa-border-strong bg-spa-surface",
          swatch === "booked" && "border-spa-booked bg-spa-booked",
          swatch === "selected" && "border-spa-accent bg-spa-accent",
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}

function SlotButton({
  label,
  booked,
  selected,
  onSelect,
}: {
  label: string;
  booked: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const { t } = useBooking();
  if (booked) {
    return (
      <button
        type="button"
        aria-disabled="true"
        aria-label={`${label}, ${t.booked}`}
        onClick={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") event.preventDefault();
        }}
        className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-spa-booked bg-spa-booked px-1 text-[14px] font-semibold leading-5 text-spa-booked-text line-through"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${label}, ${selected ? t.selected : t.available}`}
      onClick={onSelect}
      className={cx(
        "inline-flex h-11 w-full items-center justify-center rounded-sm border px-1 text-[14px] font-semibold leading-5",
        selected
          ? "border-spa-accent bg-spa-accent text-spa-cream"
          : "border-spa-border-strong bg-spa-surface text-spa-text",
      )}
    >
      {label}
    </button>
  );
}

function SummaryStep() {
  const {
    locale,
    t,
    serviceId,
    date,
    time,
    name,
    setName,
    dial,
    setDial,
    phone,
    setPhone,
    note,
    setNote,
    channel,
    setChannel,
    errors,
    submit,
    showNotes,
  } = useBooking();

  return (
    <form
      id="booking-details"
      className="scroll-mb-32 scroll-mt-[76px] flex flex-col gap-4 rounded-md border border-spa-border bg-spa-bg p-4 lg:scroll-mb-0"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <h3 className="font-display text-[20px] font-semibold leading-7 text-spa-text">{t.stepSummary}</h3>
      <dl className="flex flex-col gap-3 text-base leading-6">
        <SummaryRow label={t.labelService} value={t.serviceName[serviceId]} />
        <SummaryRow label={t.labelDate} value={formatSummaryDate(date, locale)} />
        <SummaryRow label={t.labelTime} value={time ?? ""} />
        <SummaryRow label={t.labelDuration} value={t.duration} />
        <SummaryRow label={t.labelPrice} value={t.price} />
      </dl>

      <label data-field="name" className="flex flex-col gap-2 text-[15px] font-semibold leading-5" htmlFor="guest-name">
        {t.nameLabel}
        <input
          id="guest-name"
          name="name"
          autoComplete="name"
          value={name}
          placeholder={t.namePlaceholder}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "guest-name-error" : undefined}
          onChange={(event) => setName(event.target.value)}
          className={cx(
            "h-[52px] rounded-sm bg-spa-surface px-4 text-base font-normal text-spa-text placeholder:text-spa-placeholder-text",
            errors.name ? "border-2 border-spa-error" : "border border-spa-border-strong",
          )}
        />
      </label>
      {errors.name ? (
        <p id="guest-name-error" role="alert" className="flex items-center gap-2 text-[13px] leading-[18px] text-spa-error">
          <IconAlert />
          {errors.name}
        </p>
      ) : null}

      <div data-field="phone" className="flex flex-col gap-2">
        <label className="text-[15px] font-semibold leading-5" htmlFor="guest-phone">
          {t.phoneLabel}
        </label>
        <div
          className={cx(
            "flex h-[52px] overflow-hidden rounded-sm bg-spa-surface",
            errors.phone ? "border-2 border-spa-error" : "border border-spa-border-strong",
          )}
        >
          <div className="relative flex items-center border-r border-spa-border-strong">
            <label className="sr-only" htmlFor="guest-dial">
              {t.countryCode}
            </label>
            <select
              id="guest-dial"
              value={dial}
              onChange={(event) => setDial(event.target.value)}
              className="h-full appearance-none bg-transparent pl-3 pr-8 text-[15px] font-semibold"
            >
              {DIAL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <IconChevronDown size={16} className="pointer-events-none absolute right-2 text-spa-text" />
          </div>
          <input
            id="guest-phone"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={phone}
            placeholder={t.phonePlaceholder}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "guest-phone-error" : undefined}
            onChange={(event) => setPhone(event.target.value)}
            className="min-w-0 flex-1 bg-transparent px-3 text-base font-normal text-spa-text placeholder:text-spa-placeholder-text"
          />
        </div>
        {errors.phone ? (
          <p id="guest-phone-error" role="alert" className="flex items-center gap-2 text-[13px] leading-[18px] text-spa-error">
            <IconAlert />
            {errors.phone}
          </p>
        ) : null}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-[15px] font-semibold leading-5">{t.confirmVia}</legend>
        <div
          role="radiogroup"
          aria-label={t.confirmVia}
          className="flex h-[54px] items-stretch rounded-full border border-spa-border-strong bg-spa-surface p-[5px]"
        >
          {channelOrder(locale).map((item) => {
            const selected = channel === item;
            return (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setChannel(item as Channel)}
                className={cx(
                  "h-11 flex-1 rounded-full text-[15px] font-semibold",
                  selected ? "bg-spa-accent text-spa-cream" : "text-spa-text",
                )}
              >
                {channelLabel(locale, item)}
              </button>
            );
          })}
        </div>
        {showNotes ? <p className="text-[13px] leading-[18px] text-spa-muted">{t.channelNote}</p> : null}
      </fieldset>

      {/* TODO(copy): optional note is required by the brief and is not in the Figma copy table. */}
      <label className="flex flex-col gap-2 text-[15px] font-semibold leading-5" htmlFor="guest-note">
        {t.noteLabel}
        <textarea
          id="guest-note"
          name="note"
          value={note}
          maxLength={500}
          rows={3}
          onChange={(event) => setNote(event.target.value)}
          className="rounded-sm border border-spa-border-strong bg-spa-surface px-4 py-3 text-base font-normal text-spa-text"
        />
      </label>

      <button
        type="submit"
        disabled={!time}
        aria-disabled={!time}
        className={cx(
          "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold",
          time ? "bg-spa-accent text-spa-cream" : "cursor-not-allowed bg-spa-booked text-spa-booked-text",
        )}
      >
        {time ? (
          <>
            <IconCheck size={20} />
            {t.sendRequest}
          </>
        ) : (
          t.chooseTime
        )}
      </button>
      <MessengerLink className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent text-[15px] font-semibold text-spa-accent">
        {t.orMessage}
      </MessengerLink>
      {showNotes ? <p className="text-center text-[13px] leading-[18px] text-spa-muted">{t.demoFooter}</p> : null}
    </form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-spa-muted">{label}</dt>
      <dd className="text-right font-semibold text-spa-text">{value}</dd>
    </div>
  );
}
