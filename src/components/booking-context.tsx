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
import {
  getClock,
  initialSelection,
  monthKey,
  type Clock,
} from "@/lib/dates";
import { type Channel, type Locale, type ServiceId } from "@/lib/facts";

export type Phase = "form" | "sent" | "confirmed";
export type SlotsStatus = "ready" | "loading" | "error";

type Errors = { name?: string; phone?: string };

type BookingContextValue = {
  locale: Locale;
  t: Copy;
  clock: Clock;
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
  submit: () => void;
  backToForm: () => void;
  scrollToBooking: (serviceId?: ServiceId) => void;
  scrollToDetails: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  locale,
  initialPhase,
  forceSlotError,
  children,
}: {
  locale: Locale;
  initialPhase: Phase;
  forceSlotError: boolean;
  children: ReactNode;
}) {
  const t = copy[locale];
  const clock = useMemo(() => getClock(), []);
  const initial = useMemo(() => initialSelection(clock), [clock]);
  const [serviceId, setServiceId] = useState<ServiceId>("body");
  const [date, setDateState] = useState(initial.date);
  const [month, setMonth] = useState(monthKey(initial.date));
  const [time, setTime] = useState<string | null>(initial.time);
  const [name, setName] = useState("");
  const [dial, setDial] = useState(locale === "vi" ? "+84" : "+44");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [channel, setChannel] = useState<Channel>(locale === "vi" ? "zalo" : "whatsapp");
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [slotsStatus, setSlotsStatus] = useState<SlotsStatus>(forceSlotError ? "error" : "ready");
  const timer = useRef<number | null>(null);
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
    };
  }, []);

  useEffect(() => {
    if (phase !== "form") window.scrollTo(0, 0);
  }, [phase]);

  const setDate = (iso: string) => {
    setDateState(iso);
    setMonth(monthKey(iso));
    setTime(null);
    setSlotsStatus("loading");
    if (timer.current !== null) window.clearTimeout(timer.current);
    // TODO(demo): fake delay so the skeleton state from the board is reachable. No network.
    timer.current = window.setTimeout(() => {
      setSlotsStatus("ready");
    }, 450);
  };

  const submit = () => {
    if (!time) return;
    const next: Errors = {};
    if (!name.trim()) next.name = t.errName;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6 || digits.length > 15) next.phone = t.errPhone;
    setErrors(next);
    if (next.name || next.phone) return;
    // TODO(demo): UI only. Do not fetch. Nothing is stored or sent.
    setPhase("sent");
  };

  const backToForm = () => {
    setPhase("form");
    const url = new URL(window.location.href);
    url.searchParams.delete("demo");
    window.history.replaceState(null, "", `${url.pathname}${url.search}#booking`);
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
    submit,
    backToForm,
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
