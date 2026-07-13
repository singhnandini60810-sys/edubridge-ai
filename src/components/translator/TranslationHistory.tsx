import { Clock3, RotateCcw, Trash2 } from "lucide-react";
import { getLanguageName } from "../../config/languages";
import type { TranslationHistoryItem } from "../../types/translation";

type TranslationHistoryProps = {
  history: TranslationHistoryItem[];
  onReuse: (item: TranslationHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

const formatTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000,
  );

  if (differenceInSeconds < 60) {
    return "Just now";
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} min ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return `${differenceInHours} hr ago`;
  }

  return date.toLocaleDateString();
};

const TranslationHistory = ({
  history,
  onReuse,
  onRemove,
  onClear,
}: TranslationHistoryProps) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            Recent Translation History
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Reuse or remove your recent translations.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                  {getLanguageName(item.sourceLang)}
                </span>

                <span className="text-sm font-bold text-slate-400">→</span>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {getLanguageName(item.targetLang)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Clock3 size={14} />
                {formatTime(item.createdAt)}
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Original
                </p>

                <p className="line-clamp-4 whitespace-pre-wrap text-slate-700">
                  {item.input}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-500">
                  Translation
                </p>

                <p className="line-clamp-4 whitespace-pre-wrap font-medium text-slate-800">
                  {item.output}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onReuse(item)}
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <RotateCcw size={16} />
                Reuse
              </button>

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TranslationHistory;