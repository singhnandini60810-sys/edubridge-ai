import { InferenceClient } from "@huggingface/inference";
import cors from "cors";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS."));
    },
  }),
);

app.use(express.json({ limit: "1mb" }));

type TranslationRequestBody = {
  text?: string;
  sourceLang?: string;
  targetLang?: string;
};

const languageNames: Record<string, string> = {
  en: "English",
  hi: "Hindi",
};

app.get("/", (_request: Request, response: Response) => {
  response.json({
    message: "EduBridge AI server is running.",
  });
});

app.get("/api/health", (_request: Request, response: Response) => {
  response.json({
    success: true,
    status: "healthy",
  });
});

app.post(
  "/api/translate",
  async (
    request: Request<object, object, TranslationRequestBody>,
    response: Response,
  ) => {
    const { text, sourceLang, targetLang } = request.body;

    if (!text?.trim()) {
      response.status(400).json({
        success: false,
        error: "Text is required.",
      });
      return;
    }

    if (!sourceLang || !targetLang) {
      response.status(400).json({
        success: false,
        error: "Source and target languages are required.",
      });
      return;
    }

    if (!languageNames[sourceLang] || !languageNames[targetLang]) {
      response.status(400).json({
        success: false,
        error: "Unsupported language selected.",
      });
      return;
    }

    if (sourceLang === targetLang) {
      response.json({
        success: true,
        translatedText: text.trim(),
      });
      return;
    }

    const token = process.env.HUGGINGFACE_TOKEN;

    if (!token || token === "your_token_will_go_here") {
      response.status(500).json({
        success: false,
        error: "Hugging Face token is not configured.",
      });
      return;
    }

    try {
      const client = new InferenceClient(token);

      const sourceLanguage = languageNames[sourceLang];
      const targetLanguage = languageNames[targetLang];

      const result = await client.chatCompletion({
        provider: "auto",
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a translation engine. Return only the translated text. Do not provide explanations, labels, quotation marks, or additional notes.",
          },
          {
            role: "user",
            content: `Translate from ${sourceLanguage} to ${targetLanguage}:\n\n${text.trim()}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 600,
      });

      const translatedText =
        result.choices[0]?.message?.content?.trim();

      if (!translatedText) {
        throw new Error("The AI returned an empty translation.");
      }

      response.json({
        success: true,
        translatedText,
      });
    } catch (error) {
      console.error("Translation failed:", error);

      response.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Translation failed. Please try again.",
      });
    }
  },
);

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    response.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  },
);

app.listen(PORT, () => {
  console.log(`EduBridge AI server running at http://localhost:${PORT}`);
});