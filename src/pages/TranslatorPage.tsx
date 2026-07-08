import { useState } from "react";
import { Languages, Mic, Volume2 } from "lucide-react";
import { translateText } from "../services/translatorService";

const TranslatorPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    const result = await translateText({ text: inputText, sourceLang, targetLang });
    setOutputText(result);
    setLoading(false);
  };

  const handleSpeakInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang === "hi" ? "hi-IN" : "en-US";
    recognition.interimResults = false;

    setListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setInputText(spokenText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Could not capture voice. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleListenOutput = () => {
    if (!outputText) return;

    const speech = new SpeechSynthesisUtterance(outputText);
    speech.lang = targetLang === "hi" ? "hi-IN" : "en-US";
    window.speechSynthesis.speak(speech);
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
            Type or speak a lesson and translate it for classroom learning.
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
              placeholder="Type text here or use microphone..."
              className="h-56 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-emerald-500"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleSpeakInput}
                className="flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-6 py-3 font-semibold text-sky-700 hover:bg-sky-100"
              >
                <Mic size={18} />
                {listening ? "Listening..." : "Use Mic"}
              </button>

              <button
                onClick={handleTranslate}
                disabled={loading}
                className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? "Translating..." : "Translate"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-emerald-600 p-5 text-white shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-emerald-100">
                TRANSLATED OUTPUT
              </p>

              <button
                onClick={handleListenOutput}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                <Volume2 size={16} />
                Listen
              </button>
            </div>

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