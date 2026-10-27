"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/booking-context";
import { BookingConfirmed, RequestSent } from "@/components/status-screens";

export function PhaseGate({ children }: { children: ReactNode }) {
  const { phase } = useBooking();
  if (phase === "sent") return <RequestSent />;
  if (phase === "confirmed") return <BookingConfirmed />;
  return <>{children}</>;
}
