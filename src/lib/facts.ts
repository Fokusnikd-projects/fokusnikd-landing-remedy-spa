/**
 * Real business facts only. Anything else on the page is a marked placeholder.
 *
 * TODO(confirm-with-spa): Zalo and WhatsApp are NOT confirmed on +84 867 135 393.
 * The buttons below are built for the sales demo. Confirm both apps on this
 * number before any guest-facing campaign.
 *
 * TODO(demo): the whole booking flow is UI-only. Nothing is sent, there is no
 * calendar connection, and slot availability is sample data.
 */

export const SPA_NAME = "Remedy Spa";

export const PHONE_DISPLAY = "+84 867 135 393";
export const PHONE_E164 = "+84867135393";
export const PHONE_DIGITS = "84867135393";

export const TEL_URL = `tel:${PHONE_E164}`;

// TODO(confirm-with-spa): same number used for both apps — unconfirmed.
export const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}`;
export const ZALO_URL = `https://zalo.me/${PHONE_DIGITS}`;

export const MAPS_URL =
  "https://www.google.com/maps/place/data=!4m2!3m1!1s0x31752f242b30a8e7:0x5a4dc7784ab90526";

/** Address query embed. Directions and reviews use MAPS_URL (the real place). */
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=35%20Hai%20B%C3%A0%20Tr%C6%B0ng%2C%20Qu%E1%BA%ADn%201%2C%20Ho%20Chi%20Minh%20City&z=16&output=embed";

export const ADDRESS_STREET = "35 Hai Bà Trưng";
export const HOURS_OPEN = "09:00";
export const HOURS_CLOSE = "23:45";
export const RATING = "4.7";
export const REVIEW_COUNT = 201;

export const TIME_ZONE = "Asia/Ho_Chi_Minh";

/**
 * TODO(placeholder): duration is not known. The v3 note assumes 60 minutes,
 * which puts the last start at 22:30 (23:45 close, rounded down to the 30-min grid).
 */
export const ASSUMED_DURATION_MIN = 60;
export const SLOT_STEP_MIN = 30;

export type Locale = "en" | "vi";
export type ServiceId = "body" | "therapeutic" | "placeholder-3" | "placeholder-4";
export type Channel = "whatsapp" | "zalo" | "call";

export type Service = {
  id: ServiceId;
  /** Real treatment vs a blank card kept from the mockup. */
  real: boolean;
};

export const SERVICES: Service[] = [
  { id: "body", real: true },
  { id: "therapeutic", real: true },
  { id: "placeholder-3", real: false },
  { id: "placeholder-4", real: false },
];

/** Demo availability from the v3 frames. Not a live calendar. */
export const DEMO_FULL_DATES = new Set(["2026-11-07", "2026-11-14", "2026-11-21", "2026-11-28"]);

export const DEMO_BOOKED_TIMES = new Set([
  "10:00",
  "11:30",
  "14:00",
  "14:30",
  "17:00",
  "18:00",
  "19:30",
  "20:00",
  "21:00",
]);

/**
 * The v3 frames are drawn with “today” = Monday 2 Nov 2026.
 * Before that date the sales demo keeps that calendar so it matches the mockup.
 * From 2 Nov 2026 onward the window follows the real Vietnam date.
 */
export const DEMO_CALENDAR_ANCHOR = "2026-11-02";
export const DEMO_SELECTED_DATE = "2026-11-04";
export const DEMO_SELECTED_TIME = "19:00";

export function messengerUrl(locale: Locale, channel?: Channel): string {
  const which = channel ?? (locale === "vi" ? "zalo" : "whatsapp");
  if (which === "call") return TEL_URL;
  if (which === "zalo") return ZALO_URL;
  return WHATSAPP_URL;
}

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DaySpa"],
    name: SPA_NAME,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: "Ho Chi Minh City",
      addressRegion: "Quận 1",
      addressCountry: "VN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: HOURS_OPEN,
      closes: HOURS_CLOSE,
    },
    openingHours: "Mo-Su 09:00-23:45",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING,
      reviewCount: String(REVIEW_COUNT),
      bestRating: "5",
    },
    hasMap: MAPS_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Treatments",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Body massage",
            alternateName: "Massage toàn thân",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Therapeutic massage / Eastern medicine",
            alternateName: "Massage trị liệu / Đông y",
          },
        },
      ],
    },
  };
}
