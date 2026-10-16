// Country and language pickers. Names come from the browser's Intl API so we
// only maintain the codes.

const COUNTRY_CODES = [
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY",
  "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CF",
  "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM",
  "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE",
  "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ",
  "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB", "LS",
  "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX",
  "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG",
  "KP", "MK", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "PR", "QA",
  "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK",
  "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TW", "TJ", "TZ",
  "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "CA", "UY",
  "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW",
];

const LANGUAGE_CODES = [
  "ar", "bn", "zh", "nl", "en", "fa", "fr", "de", "el", "gu", "he", "hi", "id", "it", "ja", "kn",
  "ko", "ms", "ml", "mr", "ne", "pa", "pl", "pt", "ro", "ru", "es", "sw", "tl", "ta", "te", "th",
  "tr", "uk", "ur", "uz", "vi", "yo", "ig", "ha", "am", "km", "my", "si", "kk", "az",
];

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

export const PREFER_NOT_TO_SAY = "ZZ";

export const countryName = (code: string) =>
  code === PREFER_NOT_TO_SAY ? "Prefer not to say" : code ? (regionNames.of(code) ?? code) : "";
export const OTHER_LANGUAGE = "other";

export const languageName = (code: string) =>
  code === OTHER_LANGUAGE ? "Another language" : code ? (languageNames.of(code) ?? code) : "";

export const COUNTRIES = COUNTRY_CODES.map((code) => ({ code, name: countryName(code) })).sort(
  (a, b) => a.name.localeCompare(b.name),
);

export const LANGUAGES = LANGUAGE_CODES.map((code) => ({ code, name: languageName(code) })).sort(
  (a, b) => a.name.localeCompare(b.name),
);

export const DESTINATIONS = [
  { value: "US", label: "United States", emoji: "🗽" },
  { value: "CA", label: "Canada", emoji: "🍁" },
] as const;

export const LEVELS = [
  { value: "highschool", label: "High school", emoji: "🎒" },
  { value: "university", label: "University / college", emoji: "🎓" },
] as const;

export const STAGES = [
  { value: "pre-arrival", label: "I haven't arrived yet", emoji: "✈️" },
  { value: "first-term", label: "I'm in my first term", emoji: "🌱" },
  { value: "returning", label: "I'm a returning student", emoji: "🔁" },
] as const;

export const destinationLabel = (v: string) => DESTINATIONS.find((d) => d.value === v)?.label ?? "";
export const levelLabel = (v: string) => LEVELS.find((d) => d.value === v)?.label ?? "";
export const stageLabel = (v: string) => STAGES.find((d) => d.value === v)?.label ?? "";
