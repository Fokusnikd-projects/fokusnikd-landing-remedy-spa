/**
 * Country calling codes for the phone field.
 * TODO(placeholder): the mockup shows +44 on EN as a demo. The live default
 * comes from the browser language (VI pages stay on +84).
 */

const REGION_DIAL: Record<string, string> = {
  US: "+1",
  CA: "+1",
  GB: "+44",
  IE: "+353",
  VN: "+84",
  AU: "+61",
  NZ: "+64",
  JP: "+81",
  KR: "+82",
  CN: "+86",
  TW: "+886",
  HK: "+852",
  SG: "+65",
  MY: "+60",
  TH: "+66",
  ID: "+62",
  PH: "+63",
  IN: "+91",
  KH: "+855",
  LA: "+856",
  FR: "+33",
  DE: "+49",
  IT: "+39",
  ES: "+34",
  PT: "+351",
  NL: "+31",
  BE: "+32",
  CH: "+41",
  AT: "+43",
  SE: "+46",
  NO: "+47",
  DK: "+45",
  FI: "+358",
  PL: "+48",
  CZ: "+420",
  HU: "+36",
  RO: "+40",
  GR: "+30",
  TR: "+90",
  RU: "+7",
  UA: "+380",
  AE: "+971",
  SA: "+966",
  IL: "+972",
  ZA: "+27",
  EG: "+20",
  BR: "+55",
  MX: "+52",
  AR: "+54",
  CL: "+56",
};

const LANG_DIAL: Record<string, string> = {
  vi: "+84",
  en: "+44",
  fr: "+33",
  de: "+49",
  es: "+34",
  it: "+39",
  pt: "+351",
  nl: "+31",
  pl: "+48",
  ru: "+7",
  ja: "+81",
  ko: "+82",
  zh: "+86",
  th: "+66",
  id: "+62",
  ms: "+60",
  hi: "+91",
  ar: "+971",
  tr: "+90",
  uk: "+380",
  sv: "+46",
  da: "+45",
  no: "+47",
  fi: "+358",
  cs: "+420",
};

function dialRank(dial: string): number {
  if (dial === "+84") return 0;
  if (dial === "+44") return 1;
  if (dial === "+1") return 2;
  return 10 + Number(dial.slice(1));
}

export const DIAL_OPTIONS: string[] = Array.from(new Set(Object.values(REGION_DIAL))).sort(
  (a, b) => dialRank(a) - dialRank(b),
);

export function dialFromLanguages(languages: readonly string[]): string {
  for (const language of languages) {
    const [base = "", region = ""] = language.toLowerCase().split("-");
    const regionDial = REGION_DIAL[region.toUpperCase()];
    if (regionDial) return regionDial;
    const langDial = LANG_DIAL[base];
    if (langDial) return langDial;
  }
  return "+44";
}
