type TranslateParams = {
  text: string;
  sourceLang: string;
  targetLang: string;
};

const dictionary: Record<string, Record<string, string>> = {
  en: {
    teacher: "शिक्षक",
    student: "विद्यार्थी",
    school: "विद्यालय",
    "good morning": "सुप्रभात",
    "water cycle": "जल चक्र",
  },

  hi: {
    शिक्षक: "Teacher",
    विद्यार्थी: "Student",
    विद्यालय: "School",
    सुप्रभात: "Good Morning",
    "जल चक्र": "Water Cycle",
  },
};

export const translateText = async ({
  text,
  sourceLang,
  targetLang,
}: TranslateParams): Promise<string> => {
  const clean = text.trim();

  if (!clean) return "";

  if (sourceLang === "en" && targetLang === "hi") {
    return dictionary.en[clean.toLowerCase()] ?? `[Demo] ${clean}`;
  }

  if (sourceLang === "hi" && targetLang === "en") {
    return dictionary.hi[clean] ?? `[Demo] ${clean}`;
  }

  return clean;
};