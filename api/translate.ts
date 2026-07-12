import { InferenceClient } from "@huggingface/inference";

type RequestBody = {
  text?: string;
  sourceLang?: string;
  targetLang?: string;
};

type ApiRequest = {
  method?: string;
  body?: RequestBody;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
};

const languageNames: Record<string, string> = {
  en: "English",
  hi: "Hindi",
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed.",
    });
  }

  const { text, sourceLang, targetLang } = req.body ?? {};

  if (!text?.trim()) {
    return res.status(400).json({
      error: "Text is required.",
    });
  }

  if (!sourceLang || !targetLang) {
    return res.status(400).json({
      error: "Source and target languages are required.",
    });
  }

  if (sourceLang === targetLang) {
    return res.status(200).json({
      translatedText: text.trim(),
    });
  }

  const token = process.env.HUGGINGFACE_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Hugging Face token is not configured.",
    });
  }

  try {
    const client = new InferenceClient(token);

    const sourceName = languageNames[sourceLang];
    const targetName = languageNames[targetLang];

    if (!sourceName || !targetName) {
      return res.status(400).json({
        error: "Unsupported language selected.",
      });
    }

    const prompt = [
      `Translate the following text from ${sourceName} to ${targetName}.`,
      "Return only the translated text.",
      "Do not add explanations, headings, quotation marks, or notes.",
      "",
      text.trim(),
    ].join("\n");

    const response = await client.chatCompletion({
      provider: "auto",
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.1,
    });

    const translatedText = response.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error("The AI returned an empty translation.");
    }

    return res.status(200).json({
      translatedText,
    });
  } catch (error) {
    console.error("Translation error:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Translation failed. Please try again.",
    });
  }
}