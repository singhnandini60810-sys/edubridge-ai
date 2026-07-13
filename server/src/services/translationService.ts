import { translateWithHuggingFace } from "./huggingFaceService.js";
import {
  getLanguageName,
  isSupportedLanguage,
} from "../config/languages.js";
import type {
  TranslationServiceInput,
  TranslationServiceResult,
} from "../types/translation.js";

export const translate = async ({
  text,
  sourceLang,
  targetLang,
}: TranslationServiceInput): Promise<TranslationServiceResult> => {
  const cleanText = text.trim();

  if (!cleanText) {
    throw new Error("Please enter text to translate.");
  }

  if (!isSupportedLanguage(sourceLang)) {
    throw new Error(
      `Unsupported source language: ${sourceLang}`,
    );
  }

  if (!isSupportedLanguage(targetLang)) {
    throw new Error(
      `Unsupported target language: ${targetLang}`,
    );
  }

  if (sourceLang === targetLang) {
    return {
      translatedText: cleanText,
      sourceLang,
      targetLang,
    };
  }

  const translatedText = await translateWithHuggingFace({
    text: cleanText,
    sourceLanguage: getLanguageName(sourceLang),
    targetLanguage: getLanguageName(targetLang),
  });

  return {
    translatedText,
    sourceLang,
    targetLang,
  };
};