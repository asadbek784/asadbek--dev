import { useLang } from '@/i18n/LangContext';
import type { Lang } from '@/i18n/translations';

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'uz', label: "O'Z", flag: '🇺🇿' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            fontFamily: '"Instrument Mono", monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            fontWeight: lang === l.code ? 700 : 400,
            background: lang === l.code ? 'rgba(184,255,60,0.12)' : 'transparent',
            color: lang === l.code ? 'var(--acid)' : 'var(--text-2)',
            border: lang === l.code ? '1px solid rgba(184,255,60,0.25)' : '1px solid transparent',
          }}
        >
          <span>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}
