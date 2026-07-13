export type LanguageCategory = "Indian" | "Asian" | "Western";

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  category: LanguageCategory;
  speechCode: string;
};

export const languages: Language[] = [
  // Indian languages
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    category: "Indian",
    speechCode: "hi-IN",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    category: "Indian",
    speechCode: "bn-IN",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    category: "Indian",
    speechCode: "ta-IN",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    category: "Indian",
    speechCode: "te-IN",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    category: "Indian",
    speechCode: "mr-IN",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    category: "Indian",
    speechCode: "gu-IN",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    category: "Indian",
    speechCode: "kn-IN",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    category: "Indian",
    speechCode: "ml-IN",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    category: "Indian",
    speechCode: "pa-IN",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    category: "Indian",
    speechCode: "ur-IN",
  },

  // Asian languages
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    category: "Asian",
    speechCode: "zh-CN",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    category: "Asian",
    speechCode: "ja-JP",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    category: "Asian",
    speechCode: "ko-KR",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    category: "Asian",
    speechCode: "th-TH",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    category: "Asian",
    speechCode: "vi-VN",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    category: "Asian",
    speechCode: "id-ID",
  },
  {
    code: "ms",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    category: "Asian",
    speechCode: "ms-MY",
  },
  {
    code: "fil",
    name: "Filipino",
    nativeName: "Filipino",
    category: "Asian",
    speechCode: "fil-PH",
  },
  {
    code: "my",
    name: "Burmese",
    nativeName: "မြန်မာ",
    category: "Asian",
    speechCode: "my-MM",
  },
  {
    code: "km",
    name: "Khmer",
    nativeName: "ខ្មែរ",
    category: "Asian",
    speechCode: "km-KH",
  },

  // Western and global languages
  {
    code: "en",
    name: "English",
    nativeName: "English",
    category: "Western",
    speechCode: "en-US",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    category: "Western",
    speechCode: "fr-FR",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    category: "Western",
    speechCode: "de-DE",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    category: "Western",
    speechCode: "es-ES",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    category: "Western",
    speechCode: "pt-PT",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    category: "Western",
    speechCode: "it-IT",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    category: "Western",
    speechCode: "ru-RU",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    category: "Western",
    speechCode: "nl-NL",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    category: "Western",
    speechCode: "pl-PL",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    category: "Western",
    speechCode: "tr-TR",
  },
];

export const languageGroups: LanguageCategory[] = [
  "Indian",
  "Asian",
  "Western",
];

export const getLanguageByCode = (
  code: string,
): Language | undefined => {
  return languages.find((language) => language.code === code);
};

export const getLanguageName = (code: string): string => {
  return getLanguageByCode(code)?.name ?? code;
};

export const getSpeechCode = (code: string): string => {
  return getLanguageByCode(code)?.speechCode ?? "en-US";
};