import { InferenceClient } from "@huggingface/inference";
import { env } from "../config/env.js";

type TranslationOptions = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
};

const client = new InferenceClient(env.HUGGINGFACE_TOKEN);

export const translateWithHuggingFace = async ({
  text,
  sourceLanguage,
  targetLanguage,
}: TranslationOptions): Promise<string> => {
  const cleanText = text.trim();

  if (!cleanText) {
    throw new Error("Translation text cannot be empty.");
  }

  if (sourceLanguage === targetLanguage) {
    return cleanText;
  }

  try {
    const result = await client.chatCompletion({
      provider: "auto",
      model: env.HUGGINGFACE_MODEL,
      messages: [
        {
          role: "system",
          content: [
            "You are a professional multilingual translation engine.",
            "Translate accurately while preserving the original meaning and tone.",
            "Return only the translated text.",
            "Do not include explanations, headings, quotation marks, romanization, or notes.",
          ].join(" "),
        },
        {
          role: "user",
          content: [
            `Source language: ${sourceLanguage}`,
            `Target language: ${targetLanguage}`,
            "",
            "Text:",
            cleanText,
          ].join("\n"),
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const translatedText =
      result.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error(
        "The AI service returned an empty translation.",
      );
    }

    return translatedText;
  } catch (error) {
    console.error("Hugging Face translation error:", error);

    if (error instanceof Error) {
      if (
        error.message.toLowerCase().includes("unauthorized") ||
        error.message.includes("401")
      ) {
        throw new Error(
          "The Hugging Face token is invalid or does not have inference permission.",
        );
      }

      if (
        error.message.toLowerCase().includes("rate limit") ||
        error.message.includes("429")
      ) {
        throw new Error(
          "The free AI translation limit has been reached. Please wait and try again.",
        );
      }

      throw new Error(`AI translation failed: ${error.message}`);
    }

    throw new Error(
      "The AI translation service is currently unavailable.",
    );
  }
};