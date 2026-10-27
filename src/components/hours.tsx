import { IconClock, IconPin } from "@/components/icons";
import { Container, Overline, SectionHeading } from "@/components/ui";
import { copy } from "@/lib/copy";
import { MAPS_EMBED_URL, MAPS_URL, type Locale } from "@/lib/facts";

export function Hours({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="hours" className="scroll-mt-24 py-12 lg:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading locale={locale} overline={t.hoursOverline} title={t.hoursTitle} />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-between gap-6 rounded-lg bg-spa-accent p-6 text-spa-cream lg:p-8">
            <div className="flex flex-col gap-4">
              <Overline locale={locale} onAccent>
                {t.openDaily}
              </Overline>
              <p className="font-display text-[40px] leading-none text-spa-cream lg:text-[56px]">{t.hoursRange}</p>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-spa-gold-on px-3 py-1.5 text-[15px] leading-[22px] text-spa-cream">
                <IconClock size={16} className="text-spa-gold-on" />
                {t.lateHours}
              </p>
              <p className="flex items-center gap-2 text-base leading-6">
                <IconPin size={20} className="shrink-0 text-spa-gold-on" />
                {t.hoursAddress}
              </p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-full bg-spa-cream px-6 text-[15px] font-semibold text-spa-accent"
            >
              <IconPin size={20} />
              {t.openMaps}
            </a>
          </div>
          <div className="min-h-[240px] flex-1 overflow-hidden rounded-lg border border-dashed border-spa-placeholder-text bg-spa-placeholder lg:min-h-[320px]">
            <iframe
              title={t.mapTitle}
              src={MAPS_EMBED_URL}
              className="h-full min-h-[240px] w-full border-0 lg:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
