import {
  CheckCircle2,
  Clipboard,
  Languages,
  Volume2,
} from "lucide-react";
import { getLanguageName } from "../../config/languages";

type TranslatorOutputProps = {
  languageCode: string;
  translatedText: string;
  loading: boolean;
  onCopy: () => void;
  onSpeak: () => void;
};

const TranslatorOutput = ({
  languageCode,
  translatedText,
  loading,
  onCopy,
  onSpeak,
}: TranslatorOutputProps) => {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Output Language
          </p>

          <h3 className="text-xl font-bold text-slate-900">
            {getLanguageName(languageCode)}
          </h3>
        </div>

        <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          AI Ready
        </div>
      </div>

      {/* Translation Box */}
      <div className="flex flex-1 flex-col rounded-3xl border border-slate-200 bg-slate-50 p-5">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-3 text-slate-500">
              <Languages className="animate-pulse" size={22} />
              Translating...
            </div>
          </div>
        ) : translatedText ? (
          <div className="flex flex-1 flex-col justify-between">
            <div className="overflow-y-auto whitespace-pre-wrap text-lg leading-8 text-slate-800">
              {translatedText}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCopy}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Clipboard size={18} />
                Copy
              </button>

              <button
                type="button"
                onClick={onSpeak}
                className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                <Volume2 size={18} />
                Listen
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <CheckCircle2
              className="mb-4 text-slate-300"
              size={60}
            />

            <h4 className="text-xl font-semibold text-slate-600">
              Translation Ready
            </h4>

            <p className="mt-2 max-w-sm text-slate-500">
              Type or speak a sentence, then press
              <strong> Translate </strong>
              to see the AI-generated translation here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatorOutput;