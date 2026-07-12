type TranslateParams = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

type TranslationResponse = {
  success?: boolean;
  translatedText?: string;
  error?: string;
};

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const translateText = async ({
  text,
  sourceLang,
  targetLang,
}: TranslateParams): Promise<string> => {
  const cleanText = text.trim();

  if (!cleanText) {
    return "";
  }

  const response = await fetch(`${API_URL}/api/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: cleanText,
      sourceLang,
      targetLang,
    }),
  });

  const data = (await response.json()) as TranslationResponse;

  if (!response.ok) {
    throw new Error(data.error || "Translation failed.");
  }

  if (!data.translatedText) {
    throw new Error("The server returned no translation.");
  }

  return data.translatedText;
};