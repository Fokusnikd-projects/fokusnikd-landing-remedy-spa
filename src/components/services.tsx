"use client";

import { IconClock } from "@/components/icons";
import { useBooking } from "@/components/booking-context";
import { Container, PhotoSlot, SectionHeading } from "@/components/ui";
import { SERVICES, type ServiceId } from "@/lib/facts";

export function Services() {
  const { locale, t, scrollToBooking } = useBooking();
  return (
    <section id="services" className="scroll-mt-24 py-12 lg:py-16">
      <Container className="flex flex-col gap-4">
        <SectionHeading locale={locale} overline={t.servicesOverline} title={t.servicesTitle} />
        <p className="text-base leading-6 text-spa-muted">{t.servicesNote}</p>
        <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-4 lg:gap-6">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <article className="flex h-full gap-3 rounded-md border border-spa-border bg-spa-surface p-3 lg:flex-col lg:overflow-hidden lg:p-0">
                <div className="h-24 w-24 shrink-0 lg:hidden">
                  <PhotoSlot label={t.photo} className="h-full w-full rounded-md" />
                </div>
                <div className="hidden h-44 w-full lg:block">
                  <PhotoSlot label={t.photoTreatment} className="h-full w-full rounded-none border-x-0 border-t-0" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1 lg:p-4">
                  <h3 className="font-display text-[20px] font-semibold leading-7 text-spa-text">
                    {t.serviceName[service.id]}
                  </h3>
                  <p className="text-[15px] leading-[22px] text-spa-muted">{t.serviceDescription}</p>
                  <p className="mt-1 flex items-center gap-1 text-[15px] leading-[22px] text-spa-text">
                    <IconClock size={16} className="text-spa-gold-text" />
                    {t.duration}
                  </p>
                  <p className="text-[15px] font-semibold leading-5 text-spa-text">{t.price}</p>
                  {t.priceUsd ? <p className="text-[13px] leading-[18px] text-spa-muted">{t.priceUsd}</p> : null}
                  <button
                    type="button"
                    onClick={() => scrollToBooking(service.id as ServiceId)}
                    className="mt-2 w-fit text-[15px] font-semibold leading-5 text-spa-accent lg:mt-auto"
                  >
                    {t.bookLink}
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
