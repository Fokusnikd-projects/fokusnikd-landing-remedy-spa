import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Locale } from "@/lib/facts";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-page px-6 min-[1248px]:px-0", className)}>{children}</div>;
}

export function Overline({
  locale,
  children,
  onAccent = false,
}: {
  locale: Locale;
  children: ReactNode;
  onAccent?: boolean;
}) {
  const color = onAccent ? "text-spa-gold-on" : "text-spa-gold-text";
  if (locale === "vi") {
    return <p className={cx("text-[13px] font-semibold leading-5 tracking-[0.02em]", color)}>{children}</p>;
  }
  return (
    <p className={cx("text-[12px] font-semibold uppercase leading-4 tracking-[0.12em]", color)}>{children}</p>
  );
}

export function SectionHeading({
  locale,
  overline,
  title,
  titleMobile,
}: {
  locale: Locale;
  overline: string;
  title: string;
  titleMobile?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Overline locale={locale}>{overline}</Overline>
      <h2 className="font-display text-balance text-[30px] font-medium leading-[38px] text-spa-text lg:text-[44px] lg:leading-[52px]">
        {titleMobile ? (
          <>
            <span className="lg:hidden">{titleMobile}</span>
            <span className="hidden lg:inline">{title}</span>
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}

/** TODO(placeholder): neutral block until the spa provides a photo. Not a stock photo. */
export function PhotoSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cx(
        "relative flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-spa-placeholder-text bg-gradient-to-br from-[#E7DFD2] via-[#EFE7DA] to-[#E0D6C6]",
        className,
      )}
    >
      <span className="px-2 text-center text-[13px] leading-[18px] text-spa-placeholder-text">{label}</span>
    </div>
  );
}

const primaryClass =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-spa-accent px-6 text-[15px] font-semibold leading-5 text-spa-cream box-border";
const secondaryClass =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] border-spa-accent bg-spa-surface px-6 text-[15px] font-semibold leading-5 text-spa-accent box-border";

export function PrimaryLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cx(primaryClass, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function SecondaryLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cx(secondaryClass, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function IconLink({
  href,
  label,
  children,
  className,
  external = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cx(
        "inline-flex size-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-spa-accent bg-spa-surface text-spa-accent box-border",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="w-full rounded-sm border border-dashed border-spa-gold bg-spa-sand px-3 py-2 text-[13px] leading-[18px] text-spa-text">
      {children}
    </p>
  );
}

export function SlotNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-sm border border-dashed border-spa-gold bg-spa-sand px-3 py-2 text-[13px] leading-[18px] text-spa-muted">
      {children}
    </p>
  );
}

export function TextLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cx("inline-flex h-11 items-center text-[15px] font-semibold leading-5 text-spa-accent", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
