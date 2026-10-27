import Link from "next/link";
import { copy } from "@/lib/copy";
import type { Locale } from "@/lib/facts";
import { SPA_NAME } from "@/lib/facts";
import { cx } from "@/lib/cx";

function LangLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      hrefLang={label === "VI" ? "vi" : "en"}
      aria-current={active ? "page" : undefined}
      className="flex h-11 w-12 items-center justify-center"
    >
      <span
        className={cx(
          "flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[13px] font-semibold leading-5",
          active ? "bg-spa-accent text-spa-cream" : "text-spa-text",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-spa-border bg-spa-bg">
      <div className="mx-auto flex h-[60px] w-full max-w-page items-center justify-between px-6 min-[1248px]:px-0">
        <a href="#top" className="flex items-center gap-3">
          {/* TODO(placeholder): logo artwork is not available. */}
          <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-dashed border-spa-gold bg-spa-placeholder text-[10px] leading-none text-spa-placeholder-text">
            {t.logo}
          </span>
          <span className="font-display text-[20px] font-medium leading-7 text-spa-text">{SPA_NAME}</span>
        </a>
        <nav className="hidden items-center gap-8 text-base leading-6 text-spa-text lg:flex" aria-label={SPA_NAME}>
          <a className="hover:text-spa-accent" href="#services">
            {t.navServices}
          </a>
          <a className="hover:text-spa-accent" href="#booking">
            {t.navBooking}
          </a>
          <a className="hover:text-spa-accent" href="#reviews">
            {t.navReviews}
          </a>
          <a className="hover:text-spa-accent" href="#hours">
            {t.navHours}
          </a>
          <a className="hover:text-spa-accent" href="#contact">
            {t.navContact}
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex h-11 items-center rounded-full border border-spa-border-strong bg-spa-surface px-1">
            <LangLink href="/en" label="EN" active={locale === "en"} />
            <LangLink href="/vi" label="VI" active={locale === "vi"} />
          </div>
          <a
            href="#booking"
            className="hidden h-[52px] items-center justify-center rounded-full border-[1.5px] border-spa-accent px-5 text-[15px] font-semibold text-spa-accent lg:inline-flex"
          >
            {t.bookOnlineHeader}
          </a>
        </div>
      </div>
    </header>
  );
}
