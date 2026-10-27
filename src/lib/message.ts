import { formatSummaryDate } from "@/lib/dates";
import { WHATSAPP_URL, type Locale } from "@/lib/facts";

export function bookingMessage(
  locale: Locale,
  input: { service: string; dateIso: string; time: string | null; name: string },
): string {
  const lines = [locale === "vi" ? "Xin chào Remedy Spa." : "Hello Remedy Spa."];
  if (input.service) {
    lines.push(`${locale === "vi" ? "Dịch vụ" : "Service"}: ${input.service}`);
  }
  if (input.dateIso) {
    lines.push(`${locale === "vi" ? "Ngày" : "Date"}: ${formatSummaryDate(input.dateIso, locale)}`);
  }
  if (input.time) {
    lines.push(`${locale === "vi" ? "Giờ" : "Time"}: ${input.time}`);
  }
  const name = input.name.trim();
  if (name) {
    lines.push(`${locale === "vi" ? "Tên" : "Name"}: ${name}`);
  }
  return lines.join("\n");
}

export function whatsappHref(text: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

/** Synchronous copy so a Zalo window can open in the same click. */
export function copyText(text: string): boolean {
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
