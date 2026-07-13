import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  HUGGINGFACE_TOKEN: process.env.HUGGINGFACE_TOKEN ?? "",

  HUGGINGFACE_MODEL:
    process.env.HUGGINGFACE_MODEL ??
    "facebook/nllb-200-distilled-600M",
};

if (!env.HUGGINGFACE_TOKEN) {
  throw new Error(
    "Missing HUGGINGFACE_TOKEN in server/.env"
  );
}