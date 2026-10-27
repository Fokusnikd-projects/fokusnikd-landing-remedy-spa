"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { copy, type Copy } from "@/lib/copy";
import { dialFromLanguages } from "@/lib/dial";
import { getClock, initialSelection, monthKey, slotsForDate, type Clock } from "@/lib/dates";
import { type Channel, type Locale, type ServiceId } from "@/lib/facts";

export type Phase = "form" | "sent" | "confirmed";
export type SlotsStatus = "ready" | "loading" | "error";

type Errors = { name?: string; phone?: string };
type FocusField = "name" | "phone" | null;

const HEADER_OFFSET = 61;

type BookingContextValue = {
  locale: Locale;
  t: Copy;
  clock: Clock;
  showNotes: boolean;
  serviceId: ServiceId;
  setServiceId: (id: ServiceId) => void;
  date: string;
  setDate: (iso: string) => void;
  month: string;
  setMonth: (key: string) => void;
  time: string | null;
  setTime: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  dial: string;
  setDial: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  channel: Channel;
  setChannel: (value: Channel) => void;
  errors: Errors;
  phase: Phase;
  slotsStatus: SlotsStatus;
  takenNotice: boolean;
  racedKeys: string[];
  notice: string | null;
  showNotice: (message: string) => void;
  submit: () => void;
  retrySlots: () => void;
  backToForm: () => void;
  editNumber: () => void;
  scrollToBooking: (serviceId?: ServiceId) => void;
  scrollToDetails: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function scrollField(field: "name" | "phone") {
  const wrap = document.querySelector(`[data-field="${field}"]`);
  const input = document.getElementById(field === "name" ? "guest-name" : "guest-phone");
  const target = wrap ?? input;
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
  input?.focus({ preventScroll: true });
}

export function BookingProvider({
  locale,
  initialPhase,
  forceSlotError,
  prefill,
  forceTaken,
  showNotes,
  children,
}: {
  locale: Locale;
  initialPhase: Phase;
  forceSlotError: boolean;
  prefill: boolean;
  forceTaken: boolean;
  showNotes: boolean;
  children: ReactNode;
}) {
  const t = copy[locale];
  const clock = useMemo(() => getClock(), []);
  const initial = useMemo(() => initialSelection(clock, prefill), [clock, prefill]);
  const [serviceId, setServiceId] = useState<ServiceId>("body");
  const [date, setDateState] = useState(initial.date);
  const [month, setMonth] = useState(monthKey(initial.date));
  const [time, setTimeState] = useState<string | null>(initial.time);
  const [name, setNameState] = useState("");
  const [dial, setDial] = useState(locale === "vi" ? "+84" : "+44");
  const [phone, setPhoneState] = useState("");
  const [note, setNote] = useState("");
  const [channel, setChannel] = useState<Channel>(locale === "vi" ? "zalo" : "whatsapp");
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [slotsStatus, setSlotsStatus] = useState<SlotsStatus>(forceSlotError ? "error" : "ready");
  const [takenNotice, setTakenNotice] = useState(false);
  const [racedKeys, setRacedKeys] = useState<string[]>([]);
  const [simulateTaken, setSimulateTaken] = useState(forceTaken);
  const [notice, setNotice] = useState<string | null>(null);
  const focusField = useRef<FocusField>(null);
  const timer = useRef<number | null>(null);
  const noticeTimer = useRef<number | null>(null);
  const dialReady = useRef(false);

  useEffect(() => {
    if (dialReady.current || locale === "vi") return;
    dialReady.current = true;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    setDial(dialFromLanguages(languages));
  }, [locale]);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "form") window.scrollTo(0, 0);
  }, [phase]);

  useEffect(() => {
    if (phase !== "form" || !focusField.current) return;
    const field = focusField.current;
    focusField.current = null;
    const id = window.setTimeout(() => scrollField(field), 60);
    return () => window.clearTimeout(id);
  }, [phase]);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3500);
  };

  const armSlots = (next: SlotsStatus) => {
    setSlotsStatus("loading");
    if (timer.current !== null) window.clearTimeout(timer.current);
    // TODO(demo): fake delay so the skeleton state from the board is reachable. No network.
    timer.current = window.setTimeout(() => setSlotsStatus(next), 450);
  };

  const setDate = (iso: string) => {
    setDateState(iso);
    setMonth(monthKey(iso));
    setTimeState(null);
    setTakenNotice(false);
    armSlots("ready");
  };

  const setTime = (value: string) => {
    setTimeState(value);
    setTakenNotice(false);
  };

  const setName = (value: string) => {
    setNameState(value);
    setErrors((current) => ({ ...current, name: undefined }));
  };

  const setPhone = (value: string) => {
    setPhoneState(value);
    setErrors((current) => ({ ...current, phone: undefined }));
  };

  const retrySlots = () => {
    setTakenNotice(false);
    armSlots("ready");
  };

  const submit = () => {
    if (!time) return;
    const next: Errors = {};
    if (!name.trim()) next.name = t.errName;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6 || digits.length > 15) next.phone = t.errPhone;
    setErrors(next);
    if (next.name || next.phone) {
      scrollField(next.name ? "name" : "phone");
      return;
    }
    const key = `${date}|${time}`;
    const offered = slotsForDate(date, clock).some((slot) => slot.label === time && !slot.booked);
    // TODO(demo): ?demo=taken simulates a slot disappearing between pick and submit. Nothing is sent.
    if (simulateTaken || !offered || racedKeys.includes(key)) {
      setSimulateTaken(false);
      setRacedKeys((current) => (current.includes(key) ? current : [...current, key]));
      setTimeState(null);
      setTakenNotice(true);
      window.requestAnimationFrame(() => {
        document.getElementById("booking-time")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    // TODO(demo): UI only. Do not fetch. Nothing is stored or sent.
    setPhase("sent");
  };

  const clearDemoParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("demo");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  };

  const backToForm = () => {
    setPhase("form");
    clearDemoParam();
  };

  const editNumber = () => {
    focusField.current = "phone";
    setPhase("form");
    clearDemoParam();
  };

  const scrollToBooking = (nextService?: ServiceId) => {
    if (nextService) setServiceId(nextService);
    if (phase !== "form") setPhase("form");
    window.requestAnimationFrame(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollToDetails = () => {
    document.getElementById("booking-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const value: BookingContextValue = {
    locale,
    t,
    clock,
    showNotes,
    serviceId,
    setServiceId,
    date,
    setDate,
    month,
    setMonth,
    time,
    setTime,
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
    phase,
    slotsStatus,
    takenNotice,
    racedKeys,
    notice,
    showNotice,
    submit,
    retrySlots,
    backToForm,
    editNumber,
    scrollToBooking,
    scrollToDetails,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking must be used inside BookingProvider");
  return value;
}
