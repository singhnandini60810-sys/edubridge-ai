import {
  languageGroups,
  languages,
} from "../../config/languages";

type LanguageSelectorProps = {
  label: string;
  value: string;
  onChange: (languageCode: string) => void;
};

const LanguageSelector = ({
  label,
  value,
  onChange,
}: LanguageSelectorProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        {languageGroups.map((group) => (
          <optgroup key={group} label={`${group} Languages`}>
            {languages
              .filter((language) => language.category === group)
              .map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                >
                  {language.name} — {language.nativeName}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;