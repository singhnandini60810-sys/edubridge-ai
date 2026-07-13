import { useEffect, useState } from "react";
import { MAX_HISTORY_ITEMS } from "../config/constants";
import { translateText } from "../services/translatorService";
import type {
  TranslationHistoryItem,
  TranslationRequest,
} from "../types/translation";

const HISTORY_STORAGE_KEY = "translationHistory";

export const useTranslation = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!savedHistory) {
      return;
    }

    try {
      const parsedHistory = JSON.parse(
        savedHistory,
      ) as TranslationHistoryItem[];

      setHistory(parsedHistory);
    } catch {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  const translate = async (
    request: TranslationRequest,
  ): Promise<string | null> => {
    const cleanText = request.text.trim();

    if (!cleanText) {
      setErrorMessage("Please type or speak something before translating.");
      return null;
    }

    if (request.sourceLang === request.targetLang) {
      setErrorMessage("Please choose two different languages.");
      return null;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await translateText({
        ...request,
        text: cleanText,
      });

      setTranslatedText(result);

      const newHistoryItem: TranslationHistoryItem = {
        id: crypto.randomUUID(),
        input: cleanText,
        output: result,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
        createdAt: new Date().toISOString(),
      };

      setHistory((currentHistory) => {
        const updatedHistory = [
          newHistoryItem,
          ...currentHistory,
        ].slice(0, MAX_HISTORY_ITEMS);

        localStorage.setItem(
          HISTORY_STORAGE_KEY,
          JSON.stringify(updatedHistory),
        );

        return updatedHistory;
      });

      return result;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Translation failed. Please try again.";

      setErrorMessage(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  const removeHistoryItem = (id: string) => {
    setHistory((currentHistory) => {
      const updatedHistory = currentHistory.filter(
        (item) => item.id !== id,
      );

      localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(updatedHistory),
      );

      return updatedHistory;
    });
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const clearTranslation = () => {
    setTranslatedText("");
  };

  return {
    translatedText,
    loading,
    errorMessage,
    history,
    translate,
    clearHistory,
    removeHistoryItem,
    clearError,
    clearTranslation,
  };
};