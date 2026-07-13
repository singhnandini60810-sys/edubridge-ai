import { useState } from "react";
import { Languages, Sparkles } from "lucide-react";
import LanguageSelector from "../components/translator/LanguageSelector";
import SwapButton from "../components/translator/SwapButton";
import TranslationHistory from "../components/translator/TranslationHistory";
import TranslatorInput from "../components/translator/TranslatorInput";
import TranslatorOutput from "../components/translator/TranslatorOutput";
import VoiceControls from "../components/translator/VoiceControls";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useTranslation } from "../hooks/useTranslation";
import type { TranslationHistoryItem } from "../types/translation";

const TranslatorPage = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");

  const {
    translatedText,
    loading,
    errorMessage,
    history,
    translate,
    clearHistory,
    removeHistoryItem,
    clearError,
    clearTranslation,
  } = useTranslation();

  const {
    isListening,
    speechError: recognitionError,
    startListening,
    stopListening,
    clearSpeechError: clearRecognitionError,
  } = useSpeechRecognition({
    languageCode: sourceLang,
    onResult: (transcript) => {
      setInputText(transcript);
      clearError();
    },
  });

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    speechError: synthesisError,
    clearSpeechError: clearSynthesisError,
  } = useSpeechSynthesis();

  const displayedError =
    errorMessage || recognitionError || synthesisError;

  const handleInputChange = (value: string) => {
    setInputText(value);
    clearError();
    clearRecognitionError();
    clearSynthesisError();
  };

  const handleTranslate = async () => {
    await translate({
      text: inputText,
      sourceLang,
      targetLang,
    });
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    if (translatedText) {
      setInputText(translatedText);
      clearTranslation();
    }

    clearError();
    clearRecognitionError();
    clearSynthesisError();
  };

  const handleSpeakOutput = () => {
    speak({
      text: translatedText,
      languageCode: targetLang,
    });
  };

  const handleCopyOutput = async () => {
    if (!translatedText.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(translatedText);
    } catch {
      alert("Could not copy the translation.");
    }
  };

  const handleReuseHistory = (item: TranslationHistoryItem) => {
    setInputText(item.input);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    clearTranslation();
    clearError();

    window.scrollTo({
      top: document.getElementById("translator")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="translator"
      className="bg-gradient-to-b from-white to-emerald-50/40 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
            <Languages size={30} />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Sparkles size={16} />
            AI-powered multilingual learning
          </div>

          <h2 className="text-4xl font-extrabold text-slate-950 md:text-5xl">
            Translate, listen, and learn
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Translate classroom lessons across Indian, Asian, and Western
            languages using text, microphone input, and speech output.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur md:p-8">
          <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
            <LanguageSelector
              label="Translate from"
              value={sourceLang}
              onChange={(languageCode) => {
                setSourceLang(languageCode);
                clearError();
              }}
            />

            <SwapButton onClick={handleSwapLanguages} />

            <LanguageSelector
              label="Translate to"
              value={targetLang}
              onChange={(languageCode) => {
                setTargetLang(languageCode);
                clearError();
              }}
            />
          </div>

          {displayedError && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {displayedError}
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <TranslatorInput
              languageCode={sourceLang}
              value={inputText}
              loading={loading}
              onChange={handleInputChange}
              onTranslate={handleTranslate}
            />

            <TranslatorOutput
              languageCode={targetLang}
              translatedText={translatedText}
              loading={loading}
              onCopy={handleCopyOutput}
              onSpeak={handleSpeakOutput}
            />
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
              Voice tools
            </p>

            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              onStartListening={startListening}
              onStopListening={stopListening}
              onSpeak={handleSpeakOutput}
              onStopSpeaking={stopSpeaking}
            />
          </div>
        </div>

        <TranslationHistory
          history={history}
          onReuse={handleReuseHistory}
          onRemove={removeHistoryItem}
          onClear={clearHistory}
        />
      </div>
    </section>
  );
};

export default TranslatorPage;