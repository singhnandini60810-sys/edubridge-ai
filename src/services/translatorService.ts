type TranslateParams = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

type TranslationResponse = {
  translatedText?: string;
  error?: string;
};

export const translateText = async ({
  text,
  sourceLang,
  targetLang,
}: TranslateParams): Promise<string> => {
  const cleanText = text.trim();

  if (!cleanText) {
    return "";
  }

  const response = await fetch("/api/translate", {
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
    throw new Error("The translation service returned no result.");
  }

  return data.translatedText;
};