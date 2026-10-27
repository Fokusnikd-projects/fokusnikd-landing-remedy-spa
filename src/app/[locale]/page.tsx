import { notFound } from "next/navigation";
import { Booking } from "@/components/booking";
import { BookingProvider, type Phase } from "@/components/booking-context";
import { BottomBar } from "@/components/bottom-bar";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Hours } from "@/components/hours";
import { PhaseGate } from "@/components/phase-gate";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";
import type { Locale } from "@/lib/facts";

export const dynamic = "force-dynamic";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LocalePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ demo?: string | string[]; slots?: string | string[] }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "vi") notFound();
  const query = await searchParams;
  const demo = first(query.demo);
  const initialPhase: Phase = demo === "confirmed" ? "confirmed" : demo === "sent" ? "sent" : "form";
  const safeLocale = locale as Locale;

  return (
    <BookingProvider locale={safeLocale} initialPhase={initialPhase} forceSlotError={first(query.slots) === "error"}>
      <Header locale={safeLocale} />
      <PhaseGate>
        <main>
          <Hero locale={safeLocale} />
          <Services />
          <Booking />
          <Reviews locale={safeLocale} />
          <Hours locale={safeLocale} />
          <Contact locale={safeLocale} />
        </main>
        <Footer locale={safeLocale} />
        <BottomBar />
      </PhaseGate>
    </BookingProvider>
  );
}
