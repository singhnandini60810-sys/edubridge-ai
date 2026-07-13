import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  Languages,
  Mic,
  Trash2,
  Volume2,
} from "lucide-react";
import {
  getLanguageName,
  getSpeechCode,
  languageGroups,
  languages,
} from "../config/languages";
import { translateText } from "../services/translatorService";

type HistoryItem = {
  input: string;
  output: string;
  sourceLang: string;
  targetLang: string;
};

const TranslatorPage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("translationHistory");

    if (!savedHistory) {
      return;
    }

    try {
      const parsedHistory = JSON.parse(savedHistory) as HistoryItem[];
      setHistory(parsedHistory);
    } catch {
      localStorage.removeItem("translationHistory");
    }
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setErrorMessage("Please type or speak something before translating.");
      return;
    }

    if (sourceLang === targetLang) {
      setErrorMessage("Please choose two different languages.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await translateText({
        text: inputText,
        sourceLang,
        targetLang,
      });

      setOutputText(result);

      const historyItem: HistoryItem = {
        input: inputText.trim(),
        output: result,
        sourceLang,
        targetLang,
      };

      const updatedHistory = [historyItem, ...history].slice(0, 5);

      setHistory(updatedHistory);

      localStorage.setItem(
        "translationHistory",
        JSON.stringify(updatedHistory),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Translation failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    if (outputText) {
      setInputText(outputText);
      setOutputText(inputText);
    }

    setErrorMessage("");
  };

  const handleSpeakInput = () => {
    const SpeechRecognition =
      (window as typeof window & {
        SpeechRecognition?: new () => any;
        webkitSpeechRecognition?: new () => any;
      }).SpeechRecognition ||
      (window as typeof window & {
        webkitSpeechRecognition?: new () => any;
      }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        "Speech recognition is not supported in this browser. Please use Google Chrome.",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = getSpeechCode(sourceLang);
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    setErrorMessage("");

    recognition.start();

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;

      setInputText(spokenText);
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      setListening(false);

      if (event.error === "not-allowed") {
        setErrorMessage(
          "Microphone permission is blocked. Allow microphone access from the browser address bar.",
        );
      } else if (event.error === "no-speech") {
        setErrorMessage(
          "No voice was detected. Click the microphone and speak clearly.",
        );
      } else {
        setErrorMessage(`Voice recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleListenOutput = () => {
    if (!outputText.trim()) {
      setErrorMessage("Translate something before using the Listen button.");
      return;
    }

    if (!("speechSynthesis" in window)) {
      setErrorMessage(
        "Speech output is not supported in your current browser.",
      );
      return;
    }

    setErrorMessage("");
    window.speechSynthesis.cancel();

    const speakTranslation = () => {
      const speech = new SpeechSynthesisUtterance(outputText);
      const availableVoices = window.speechSynthesis.getVoices();
      const requiredSpeechCode = getSpeechCode(targetLang).toLowerCase();

      const preferredVoice = availableVoices.find((voice) => {
        const voiceLanguage = voice.lang.toLowerCase();

        return (
          voiceLanguage === requiredSpeechCode ||
          voiceLanguage.startsWith(targetLang.toLowerCase())
        );
      });

      if (preferredVoice) {
        speech.voice = preferredVoice;
      }

      speech.lang = getSpeechCode(targetLang);
      speech.rate = 0.85;
      speech.pitch = 1;
      speech.volume = 1;

      speech.onerror = () => {
        setErrorMessage(
          `A speech voice for ${getLanguageName(
            targetLang,
          )} may not be installed on this device.`,
        );
      };

      window.speechSynthesis.speak(speech);
    };

    const availableVoices = window.speechSynthesis.getVoices();

    if (availableVoices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakTranslation();
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      speakTranslation();
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translationHistory");
  };

  const renderLanguageOptions = () => {
    return languageGroups.map((group) => (
      <optgroup key={group} label={`${group} Languages`}>
        {languages
          .filter((language) => language.category === group)
          .map((language) => (
            <option key={language.code} value={language.code}>
              {language.name} — {language.nativeName}
            </option>
          ))}
      </optgroup>
    ));
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

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Translate lessons using 30 Indian, Asian, and global languages with
            text, microphone input, and speech output.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-lg">
          <div className="mb-6 grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600">
                Translate from
              </span>

              <select
                value={sourceLang}
                onChange={(event) => {
                  setSourceLang(event.target.value);
                  setErrorMessage("");
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-emerald-500"
              >
                {renderLanguageOptions()}
              </select>
            </label>

            <button
              type="button"
              onClick={handleSwapLanguages}
              aria-label="Swap selected languages"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:rotate-180 hover:bg-emerald-100"
            >
              <ArrowRightLeft size={20} />
            </button>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600">
                Translate to
              </span>

              <select
                value={targetLang}
                onChange={(event) => {
                  setTargetLang(event.target.value);
                  setErrorMessage("");
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-emerald-500"
              >
                {renderLanguageOptions()}
              </select>
            </label>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  {getLanguageName(sourceLang)} input
                </p>

                <span className="text-xs text-slate-400">
                  {inputText.length} characters
                </span>
              </div>

              <textarea
                value={inputText}
                onChange={(event) => {
                  setInputText(event.target.value);
                  setErrorMessage("");
                }}
                placeholder={`Type in ${getLanguageName(sourceLang)}...`}
                maxLength={3000}
                className="h-56 w-full resize-none rounded-2xl border border-slate-200 p-4 text-slate-800 outline-none focus:border-emerald-500"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSpeakInput}
                  disabled={listening}
                  className="flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-6 py-3 font-semibold text-sky-700 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Mic size={18} />
                  {listening ? "Listening..." : "Use Mic"}
                </button>

                <button
                  type="button"
                  onClick={handleTranslate}
                  disabled={loading}
                  className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Translating..." : "Translate"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-600 p-5 text-white shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-emerald-100">
                  {getLanguageName(targetLang)} output
                </p>

                <button
                  type="button"
                  onClick={handleListenOutput}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <Volume2 size={16} />
                  Listen
                </button>
              </div>

              <div className="min-h-56 rounded-2xl bg-white/10 p-4 text-lg leading-8">
                {outputText ||
                  `Your ${getLanguageName(
                    targetLang,
                  )} translation will appear here.`}
              </div>
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Recent Translation History
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your five most recent translations are stored on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={clearHistory}
                className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
                Clear History
              </button>
            </div>

            <div className="grid gap-4">
              {history.map((item, index) => (
                <div
                  key={`${item.input}-${index}`}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {getLanguageName(item.sourceLang)} →{" "}
                    {getLanguageName(item.targetLang)}
                  </p>

                  <p className="mt-2 text-slate-800">{item.input}</p>

                  <p className="mt-2 font-semibold text-emerald-700">
                    {item.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TranslatorPage;