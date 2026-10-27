import Link from "next/link";
import { copy } from "@/lib/copy";
import { PHONE_DISPLAY, SPA_NAME, TEL_URL, type Locale } from "@/lib/facts";

export function Footer({ locale, showNotes = false }: { locale: Locale; showNotes?: boolean }) {
  const t = copy[locale];
  return (
    <footer className="bg-spa-accent px-6 pb-[104px] pt-12 text-spa-cream lg:pb-12">
      <div className="mx-auto flex w-full max-w-page flex-col gap-6 min-[1248px]:px-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2 text-base leading-6">
            <p className="font-display text-[28px] leading-9">{SPA_NAME}</p>
            <p>{t.footerAddress}</p>
            <p>{t.footerHours}</p>
            <a href={TEL_URL} className="w-fit underline-offset-2 hover:underline">
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-base leading-6">
            <Link href="/en" className="underline-offset-2 hover:underline" hrefLang="en">
              English
            </Link>
            <span aria-hidden> · </span>
            <Link href="/vi" className="underline-offset-2 hover:underline" hrefLang="vi">
              Tiếng Việt
            </Link>
          </p>
        </div>
        <div className="h-px w-full bg-[rgba(247,243,236,0.2)]" />
        <p className="text-sm leading-5 text-spa-cream/80">
          {t.copyright}
          {showNotes ? (locale === "vi" ? " · Bản demo — chưa xuất bản" : " · Demo mockup — not published") : null}
        </p>
      </div>
    </footer>
  );
}
