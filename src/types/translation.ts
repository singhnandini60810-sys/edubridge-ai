export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  success: boolean;
  translatedText: string;
  error?: string;
}

export interface TranslationHistoryItem {
  id: string;
  input: string;
  output: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  category: "Indian" | "Asian" | "Western";
  speechCode: string;
}