type TranslateParams = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

const demoTranslations: Record<string, string> = {
  "water cycle": "जल चक्र",
  "good morning": "सुप्रभात",
  "how are you": "आप कैसे हैं?",
  "school": "विद्यालय",
  "teacher": "शिक्षक",
  "student": "विद्यार्थी",
};

export const translateText = async ({
  text,
  sourceLang,
  targetLang,
}: TranslateParams): Promise<string> => {
  const cleanText = text.trim().toLowerCase();

  if (!text.trim()) {
    return "";
  }

  const demoResult = demoTranslations[cleanText];

  if (demoResult) {
    return demoResult;
  }

  return `[AI Demo] ${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()}: ${text}`;
};