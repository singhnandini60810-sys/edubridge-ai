import { SendHorizonal } from "lucide-react";
import { getLanguageName } from "../../config/languages";

type TranslatorInputProps = {
  languageCode: string;
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onTranslate: () => void;
};

const TranslatorInput = ({
  languageCode,
  value,
  loading,
  onChange,
  onTranslate,
}: TranslatorInputProps) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Input Language
          </p>

          <h3 className="text-xl font-bold text-slate-900">
            {getLanguageName(languageCode)}
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-500">
          {value.length} / 3000
        </span>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Type in ${getLanguageName(languageCode)}...`}
        maxLength={3000}
        className="h-64 w-full resize-none rounded-3xl border border-slate-200 p-5 text-base text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />

      <button
        type="button"
        disabled={loading}
        onClick={onTranslate}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <SendHorizonal size={20} />

        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default TranslatorInput;