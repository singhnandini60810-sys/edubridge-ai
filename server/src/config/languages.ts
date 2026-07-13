export type LanguageCategory = "Indian" | "Asian" | "Western";

export type SupportedLanguage = {
  code: string;
  name: string;
  nativeName: string;
  category: LanguageCategory;
};

export const supportedLanguages: SupportedLanguage[] = [
  // Indian languages
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", category: "Indian" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", category: "Indian" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", category: "Indian" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", category: "Indian" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", category: "Indian" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", category: "Indian" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", category: "Indian" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", category: "Indian" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", category: "Indian" },
  { code: "ur", name: "Urdu", nativeName: "اردو", category: "Indian" },

  // Asian languages
  { code: "zh", name: "Chinese", nativeName: "中文", category: "Asian" },
  { code: "ja", name: "Japanese", nativeName: "日本語", category: "Asian" },
  { code: "ko", name: "Korean", nativeName: "한국어", category: "Asian" },
  { code: "th", name: "Thai", nativeName: "ไทย", category: "Asian" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", category: "Asian" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", category: "Asian" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", category: "Asian" },
  { code: "fil", name: "Filipino", nativeName: "Filipino", category: "Asian" },
  { code: "my", name: "Burmese", nativeName: "မြန်မာ", category: "Asian" },
  { code: "km", name: "Khmer", nativeName: "ខ្មែរ", category: "Asian" },

  // Western languages
  { code: "en", name: "English", nativeName: "English", category: "Western" },
  { code: "fr", name: "French", nativeName: "Français", category: "Western" },
  { code: "de", name: "German", nativeName: "Deutsch", category: "Western" },
  { code: "es", name: "Spanish", nativeName: "Español", category: "Western" },
  { code: "pt", name: "Portuguese", nativeName: "Português", category: "Western" },
  { code: "it", name: "Italian", nativeName: "Italiano", category: "Western" },
  { code: "ru", name: "Russian", nativeName: "Русский", category: "Western" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", category: "Western" },
  { code: "pl", name: "Polish", nativeName: "Polski", category: "Western" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", category: "Western" },
];

export const getLanguageByCode = (
  code: string,
): SupportedLanguage | undefined => {
  return supportedLanguages.find((language) => language.code === code);
};

export const getLanguageName = (code: string): string => {
  return getLanguageByCode(code)?.name ?? code;
};

export const isSupportedLanguage = (code: string): boolean => {
  return supportedLanguages.some((language) => language.code === code);
};