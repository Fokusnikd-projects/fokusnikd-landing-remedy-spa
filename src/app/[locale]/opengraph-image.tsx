import { spaCard } from "@/lib/monogram";

export const alt = "Remedy Spa, Quận 1. Open daily 09:00–23:45. 4.7 from 201 Google reviews.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await params;
  return spaCard(locale === "vi" ? "vi" : "en");
}
