import type { Request, Response } from "express";
import { translate } from "../services/translationService.js";
import type {
  TranslationErrorResponse,
  TranslationRequestBody,
  TranslationSuccessResponse,
} from "../types/translation.js";

export const translateText = async (
  request: Request<object, object, TranslationRequestBody>,
  response: Response<
    TranslationSuccessResponse | TranslationErrorResponse
  >,
) => {
  try {
    const { text, sourceLang, targetLang } = request.body;

    const result = await translate({
      text,
      sourceLang,
      targetLang,
    });

    response.status(200).json({
      success: true,
      translatedText: result.translatedText,
      sourceLang: result.sourceLang,
      targetLang: result.targetLang,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Translation failed. Please try again.";

    response.status(400).json({
      success: false,
      error: message,
    });
  }
};