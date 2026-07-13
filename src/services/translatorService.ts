import { apiRequest } from "./apiClient";
import type {
  TranslationRequest,
  TranslationResponse,
} from "../types/translation";

export async function translateText(
  request: TranslationRequest
): Promise<string> {
  const response = await apiRequest<TranslationResponse>(
    "/api/translate",
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );

  return response.translatedText;
}