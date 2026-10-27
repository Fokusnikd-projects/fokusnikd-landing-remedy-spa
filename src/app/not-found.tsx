import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6">
      <h1 className="font-display text-4xl text-spa-text">Remedy Spa</h1>
      <p className="text-base text-spa-muted">This page is not part of the demo.</p>
      <div className="flex gap-4">
        <Link href="/en" className="font-semibold text-spa-accent">
          English
        </Link>
        <Link href="/vi" className="font-semibold text-spa-accent">
          Tiếng Việt
        </Link>
      </div>
    </main>
  );
}
