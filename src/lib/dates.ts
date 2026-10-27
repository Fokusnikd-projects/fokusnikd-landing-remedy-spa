import {
  ASSUMED_DURATION_MIN,
  DEMO_BOOKED_TIMES,
  DEMO_CALENDAR_ANCHOR,
  DEMO_FULL_DATES,
  DEMO_SELECTED_DATE,
  DEMO_SELECTED_TIME,
  HOURS_CLOSE,
  HOURS_OPEN,
  SLOT_STEP_MIN,
  TIME_ZONE,
  type Locale,
} from "@/lib/facts";

const EN_WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const EN_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const VI_WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] as const;

export type VnParts = {
  iso: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export function vietnamParts(now = new Date()): VnParts {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const bag = Object.fromEntries(fmt.formatToParts(now).map((part) => [part.type, part.value]));
  let hour = Number(bag.hour);
  if (hour === 24) hour = 0;
  const year = Number(bag.year);
  const month = Number(bag.month);
  const day = Number(bag.day);
  return {
    iso: `${bag.year}-${bag.month}-${bag.day}`,
    year,
    month,
    day,
    hour,
    minute: Number(bag.minute),
  };
}

export function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day + days));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const d = String(utc.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function weekdayIndex(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function splitIso(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export type Clock = {
  /** Calendar “today” used for the date strip and the Today label. */
  todayIso: string;
  /** Real Vietnam date, used to hide slots that have already passed. */
  realIso: string;
  realMinutes: number;
  demoCalendar: boolean;
};

export function getClock(now = new Date()): Clock {
  const real = vietnamParts(now);
  const realMinutes = real.hour * 60 + real.minute;
  if (real.iso < DEMO_CALENDAR_ANCHOR) {
    return {
      todayIso: DEMO_CALENDAR_ANCHOR,
      realIso: real.iso,
      realMinutes,
      demoCalendar: true,
    };
  }
  return {
    todayIso: real.iso,
    realIso: real.iso,
    realMinutes,
    demoCalendar: false,
  };
}

export function bookingDates(todayIso: string, count = 14): string[] {
  return Array.from({ length: count }, (_, index) => addDays(todayIso, index));
}

export function isFullyBooked(iso: string): boolean {
  return DEMO_FULL_DATES.has(iso);
}

function parseMinutes(hhmm: string): number {
  const [hour, minute] = hhmm.split(":").map(Number);
  return hour * 60 + minute;
}

export function lastStartMinute(durationMin = ASSUMED_DURATION_MIN): number {
  const close = parseMinutes(HOURS_CLOSE);
  const raw = close - durationMin;
  return raw - (raw % SLOT_STEP_MIN);
}

export function formatMinutes(total: number): string {
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export type SlotGroupId = "morning" | "afternoon" | "evening";

export type TimeSlot = {
  label: string;
  minutes: number;
  group: SlotGroupId;
  booked: boolean;
};

const GROUPS: Array<{ id: SlotGroupId; from: number; to: number }> = [
  { id: "morning", from: 9 * 60, to: 11 * 60 + 30 },
  { id: "afternoon", from: 12 * 60, to: 16 * 60 + 30 },
  { id: "evening", from: 17 * 60, to: 22 * 60 + 30 },
];

export function groupFor(minutes: number): SlotGroupId {
  const match = GROUPS.find((group) => minutes >= group.from && minutes <= group.to);
  return match?.id ?? "evening";
}

/**
 * Slots every 30 minutes from 09:00 through last start.
 * Times earlier than now + 30 min (rounded up to the grid) are omitted when
 * the selected date is the real Vietnam today. Future dates show the full grid.
 * Booked flags are demo data.
 */
export function slotsForDate(iso: string, clock: Clock): TimeSlot[] {
  if (iso < clock.realIso) return [];
  const open = parseMinutes(HOURS_OPEN);
  const end = lastStartMinute();
  let earliest = open;
  if (iso === clock.realIso) {
    const threshold = clock.realMinutes + SLOT_STEP_MIN;
    earliest = Math.max(open, Math.ceil(threshold / SLOT_STEP_MIN) * SLOT_STEP_MIN);
  }
  const slots: TimeSlot[] = [];
  for (let minutes = open; minutes <= end; minutes += SLOT_STEP_MIN) {
    if (minutes < earliest) continue;
    const label = formatMinutes(minutes);
    slots.push({
      label,
      minutes,
      group: groupFor(minutes),
      booked: DEMO_BOOKED_TIMES.has(label),
    });
  }
  return slots;
}

export function firstFreeTime(iso: string, clock: Clock): string | null {
  const slot = slotsForDate(iso, clock).find((item) => !item.booked);
  return slot?.label ?? null;
}

export function nextFreeDate(fromIso: string, clock: Clock): { iso: string; time: string } | null {
  let iso = addDays(fromIso, 1);
  for (let step = 0; step < 45; step += 1) {
    if (!isFullyBooked(iso) && iso >= clock.realIso) {
      const time = firstFreeTime(iso, clock);
      if (time) return { iso, time };
    }
    iso = addDays(iso, 1);
  }
  return null;
}

export function initialSelection(clock: Clock): { date: string; time: string | null } {
  const window = bookingDates(clock.todayIso);
  const preferred = window.includes(DEMO_SELECTED_DATE) ? DEMO_SELECTED_DATE : window[0];
  const date = isFullyBooked(preferred) ? (window.find((iso) => !isFullyBooked(iso)) ?? preferred) : preferred;
  if (isFullyBooked(date)) return { date, time: null };
  const slots = slotsForDate(date, clock);
  const preferredTime = slots.find((slot) => slot.label === DEMO_SELECTED_TIME && !slot.booked);
  return { date, time: preferredTime?.label ?? firstFreeTime(date, clock) };
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function shiftMonth(key: string, delta: number): string {
  const [year, month] = key.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1 + delta, 1));
  const y = utc.getUTCFullYear();
  const m = String(utc.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/** Monday-first grid. Nulls are leading/trailing blanks. */
export function monthGrid(key: string): Array<string | null> {
  const [year, month] = key.split("-").map(Number);
  const first = `${key}-01`;
  const mondayIndex = (weekdayIndex(first) + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: Array<string | null> = Array.from({ length: mondayIndex }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(`${key}-${String(day).padStart(2, "0")}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function enWeekday(iso: string): string {
  return EN_WD[weekdayIndex(iso)];
}

export function viWeekday(iso: string): string {
  return VI_WD[weekdayIndex(iso)];
}

export function stripLabel(iso: string, todayIso: string, locale: Locale): string {
  if (iso === todayIso) return locale === "en" ? "Today" : "Hôm nay";
  if (iso === addDays(todayIso, 1)) return locale === "en" ? "Tomorrow" : "Ngày mai";
  return locale === "en" ? enWeekday(iso) : viWeekday(iso);
}

export function formatMonthTitle(key: string, locale: Locale): string {
  const [year, month] = key.split("-").map(Number);
  if (locale === "vi") return `Tháng ${month} ${year}`;
  return `${new Intl.DateTimeFormat("en-GB", { month: "long" }).format(new Date(Date.UTC(year, month - 1, 1)))} ${year}`;
}

export function formatStripCaption(start: string, end: string, today: string, locale: Locale): string {
  const s = splitIso(start);
  const e = splitIso(end);
  const t = splitIso(today);
  if (locale === "vi") {
    return `${s.day}–${e.day}/${e.month}/${e.year} (demo: hôm nay = ${t.day}/${t.month})`;
  }
  const sameMonth = s.month === e.month && s.year === e.year;
  const startLabel = sameMonth
    ? `${enWeekday(start)} ${s.day}`
    : `${enWeekday(start)} ${s.day} ${EN_MON[s.month - 1]}`;
  return `${startLabel} – ${enWeekday(end)} ${e.day} ${EN_MON[e.month - 1]} ${e.year} (demo: today = ${enWeekday(today)} ${t.day})`;
}

export function formatSummaryDate(iso: string, locale: Locale): string {
  const { day, month, year } = splitIso(iso);
  if (locale === "vi") return `${viWeekday(iso)}, ${day}/${month}/${year} (demo)`;
  return `${enWeekday(iso)}, ${day} ${EN_MON[month - 1]} ${year} (demo)`;
}

export function formatDesktopToday(today: string, locale: Locale): string {
  const { day, month } = splitIso(today);
  if (locale === "vi") return `Hôm nay: ${viWeekday(today)}, ${day}/${month} (demo)`;
  return `Today: ${enWeekday(today)} ${day} ${EN_MON[month - 1]} (demo)`;
}

export function formatShortDay(iso: string, locale: Locale): string {
  const { day } = splitIso(iso);
  return locale === "vi" ? `${viWeekday(iso)} ${day}` : `${enWeekday(iso)} ${day}`;
}

export function formatContinue(iso: string, time: string, locale: Locale): string {
  const { day, month } = splitIso(iso);
  if (locale === "vi") {
    // TODO(copy): VI continue-bar string is not in the Figma copy table (states board is EN).
    return `Tiếp tục · ${viWeekday(iso)}, ${day}/${month}, ${time} →`;
  }
  return `Continue · ${enWeekday(iso)} ${day} ${EN_MON[month - 1]}, ${time} →`;
}

export function openNowLabel(locale: Locale, now = new Date()): string {
  const { hour, minute } = vietnamParts(now);
  const mins = hour * 60 + minute;
  const open = mins >= parseMinutes(HOURS_OPEN) && mins <= parseMinutes(HOURS_CLOSE);
  if (open) {
    return locale === "en" ? "Open now · until 23:45" : "Đang mở cửa · đến 23:45";
  }
  // TODO(copy): the closed-state VI string is not in the Figma copy table.
  return locale === "en" ? "Opens 09:00" : "Mở cửa lúc 09:00";
}

export function weekdayHeaders(locale: Locale): string[] {
  return locale === "vi" ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

/** ICS timestamps in UTC. Vietnam is UTC+7 year-round (no daylight saving). */
export function icsStamp(iso: string, time: string, plusMinutes = 0): string {
  const { year, month, day } = splitIso(iso);
  const [hour, minute] = time.split(":").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day, hour - 7, minute + plusMinutes));
  return utc.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
