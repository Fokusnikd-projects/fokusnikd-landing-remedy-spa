import { IconStar } from "@/components/icons";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { copy } from "@/lib/copy";
import { MAPS_URL, type Locale } from "@/lib/facts";

export function Reviews({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="reviews" className="scroll-mt-24 bg-spa-sand py-12 lg:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading locale={locale} overline={t.reviewsOverline} title={t.reviewsTitle} />
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-spa-border bg-spa-surface px-3 py-2 text-[15px] leading-[22px] text-spa-text"
        >
          <IconStar size={16} className="text-spa-gold" />
          {t.rating}
        </a>
        <p className="max-w-xl text-base leading-6 text-spa-text">{t.reviewsLead}</p>
        <TextLink href={MAPS_URL} external>
          {t.seeAllReviews}
        </TextLink>
      </Container>
    </section>
  );
}
