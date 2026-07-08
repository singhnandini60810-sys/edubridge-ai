import { useState } from "react";
import { Languages } from "lucide-react";
import { translateText } from "../services/translatorService";

const TranslatorPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);

    const result = await translateText({
      text: inputText,
      sourceLang,
      targetLang,
    });

    setOutputText(result);
    setLoading(false);
  };

  return (
    <section id="translator" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Languages size={28} />
          </div>

          <h2 className="text-4xl font-bold text-slate-950">
            AI Translation Workspace
          </h2>

          <p className="mt-3 text-slate-600">
            Type a lesson, word, or sentence and translate it for classroom learning.
          </p>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-lg md:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex gap-3">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>

              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
              </select>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type text here..."
              className="h-56 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-emerald-500"
            />

            <button
              onClick={handleTranslate}
              disabled={loading}
              className="mt-4 w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>

          <div className="rounded-3xl bg-emerald-600 p-5 text-white shadow-sm">
            <p className="mb-3 text-sm font-semibold text-emerald-100">
              TRANSLATED OUTPUT
            </p>

            <div className="min-h-56 rounded-2xl bg-white/10 p-4 text-lg leading-8">
              {outputText || "Your translated text will appear here."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatorPage;