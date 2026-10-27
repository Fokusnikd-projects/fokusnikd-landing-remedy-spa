import { IconChat, IconPhone } from "@/components/icons";
import { MessengerLink } from "@/components/messenger-link";
import { Container, DemoNote, SecondaryLink, SectionHeading } from "@/components/ui";
import { copy } from "@/lib/copy";
import { TEL_URL, type Channel, type Locale } from "@/lib/facts";

export function Contact({ locale, showNotes = false }: { locale: Locale; showNotes?: boolean }) {
  const t = copy[locale];
  const primary: Channel = locale === "vi" ? "zalo" : "whatsapp";
  const secondary: Channel = locale === "vi" ? "whatsapp" : "zalo";
  return (
    <section id="contact" className="scroll-mt-24 bg-spa-surface py-12 lg:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          locale={locale}
          overline={t.contactOverline}
          title={t.contactTitleDesktop}
          titleMobile={t.contactTitleMobile}
        />
        <p className="text-base leading-6 text-spa-text">{t.contactInvite}</p>
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
          {/* TODO(confirm-with-spa): Zalo / WhatsApp on +84 867 135 393 are not confirmed. */}
          <MessengerLink
            channel={primary}
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-spa-accent px-6 text-[15px] font-semibold leading-5 text-spa-cream lg:w-auto"
          >
            <IconChat size={20} />
            {t.contactPrimary}
          </MessengerLink>
          <MessengerLink
            channel={secondary}
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent bg-spa-surface px-6 text-[15px] font-semibold leading-5 text-spa-accent lg:w-auto"
          >
            <IconChat size={20} />
            {t.contactSecondary}
          </MessengerLink>
          <SecondaryLink href={TEL_URL} className="w-full lg:w-auto">
            <IconPhone size={20} />
            {t.contactCall}
          </SecondaryLink>
        </div>
        {showNotes ? <DemoNote>{t.contactAssumption}</DemoNote> : null}
      </Container>
    </section>
  );
}
