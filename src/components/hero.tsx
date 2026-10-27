import { IconCalendar, IconChat, IconPhone, IconPin, IconStar } from "@/components/icons";
import { MessengerLink } from "@/components/messenger-link";
import { OpenNowChip } from "@/components/open-now";
import { Container, IconLink, Overline, PhotoSlot, PrimaryLink } from "@/components/ui";
import { copy } from "@/lib/copy";
import { MAPS_URL, TEL_URL, type Locale } from "@/lib/facts";

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="pb-8 pt-4 lg:py-16">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
          <PhotoSlot label={t.photoHero} className="h-[160px] w-full lg:order-2 lg:h-[460px] lg:flex-1" />
          <div className="flex flex-col gap-3 lg:order-1 lg:flex-1">
            <Overline locale={locale}>{t.heroOverline}</Overline>
            <h1 className="sr-only font-display text-balance text-[64px] font-semibold leading-[72px] lg:not-sr-only">
              Remedy Spa
            </h1>
            <p className="font-display text-balance text-[22px] font-medium leading-[30px] text-spa-text lg:text-[28px] lg:leading-9">
              {t.headline}
            </p>
            <p className="hidden text-[18px] leading-7 text-spa-text lg:block">{t.subheadline}</p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-spa-border bg-spa-surface px-3 py-2 text-[15px] leading-[22px] text-spa-text"
              >
                <IconStar size={16} className="text-spa-gold" />
                {t.rating}
              </a>
              <OpenNowChip locale={locale} />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15px] leading-[22px] text-spa-text lg:hidden"
            >
              <IconPin size={16} className="shrink-0 text-spa-gold-text" />
              {t.addressLine}
            </a>
            <div className="mt-1 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center">
              <PrimaryLink href="#booking" className="w-full lg:w-auto">
                <IconCalendar size={20} />
                {t.bookOnline}
              </PrimaryLink>
              <div className="flex gap-2">
                <MessengerLink className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent bg-spa-surface px-6 text-[15px] font-semibold leading-5 text-spa-accent lg:flex-none">
                  <IconChat size={20} />
                  {t.heroMessenger}
                </MessengerLink>
                <IconLink href={TEL_URL} label={t.callLabel}>
                  <IconPhone size={20} />
                </IconLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
