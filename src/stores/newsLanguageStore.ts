import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore{
  newsCurrentLang: string ;
  setNewsLanguage: (lang:string) => void;
  clearNewsLanguage: () => void;
}

export const useNewsLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      newsCurrentLang: "en",

      setNewsLanguage: (lang) =>
        set({ newsCurrentLang: lang }),

      clearNewsLanguage: () =>
        set({ newsCurrentLang: "en" }),
    }),
    {
      name: "news-language", // key in localStorage
    }
  )
);