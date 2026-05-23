import { createContext, useContext, useState } from 'react';
import type { Lang } from './translations';

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang;
    return saved || 'en';
  });
  const change = (l: Lang) => { setLang(l); localStorage.setItem('lang', l); };
  return <Ctx.Provider value={{ lang, setLang: change }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
