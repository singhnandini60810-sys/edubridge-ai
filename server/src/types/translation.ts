export type TranslationRequestBody = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

export type TranslationSuccessResponse = {
  success: true;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
};

export type TranslationErrorResponse = {
  success: false;
  error: string;
};

export type TranslationResponse =
  | TranslationSuccessResponse
  | TranslationErrorResponse;

export type TranslationServiceInput = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

export type TranslationServiceResult = {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
};