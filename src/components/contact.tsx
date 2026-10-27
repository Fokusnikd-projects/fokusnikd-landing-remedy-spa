import { IconChat, IconPhone } from "@/components/icons";
import { Container, DemoNote, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";
import { copy } from "@/lib/copy";
import { TEL_URL, WHATSAPP_URL, ZALO_URL, type Locale } from "@/lib/facts";

export function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const primaryHref = locale === "vi" ? ZALO_URL : WHATSAPP_URL;
  const secondaryHref = locale === "vi" ? WHATSAPP_URL : ZALO_URL;
  return (
    <section id="contact" className="scroll-mt-24 bg-spa-surface py-12 lg:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          locale={locale}
          overline={t.contactOverline}
          title={t.contactTitleDesktop}
          titleMobile={t.contactTitleMobile}
        />
        <p className="rounded-sm border border-dashed border-spa-gold px-2 py-1 text-base leading-6 text-spa-text">
          {t.contactInvite}
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
          {/* TODO(confirm-with-spa): Zalo / WhatsApp on +84 867 135 393 are not confirmed. */}
          <PrimaryLink href={primaryHref} external className="w-full lg:w-auto">
            <IconChat size={20} />
            {t.contactPrimary}
          </PrimaryLink>
          <SecondaryLink href={secondaryHref} external className="w-full lg:w-auto">
            <IconChat size={20} />
            {t.contactSecondary}
          </SecondaryLink>
          <SecondaryLink href={TEL_URL} className="w-full lg:w-auto">
            <IconPhone size={20} />
            {t.contactCall}
          </SecondaryLink>
        </div>
        <DemoNote>{t.contactAssumption}</DemoNote>
      </Container>
    </section>
  );
}
