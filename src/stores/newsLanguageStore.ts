import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore{
  currentLang: string ;
  setLanguage: (data:string) => void;
   clearLanguage: () => void;
}

export const useNewsLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLang: "en",

      setLanguage: (lang) =>
        set({ currentLang: lang }),

      clearLanguage: () =>
        set({ currentLang: "en" }),
    }),
    {
      name: "news-language", // key in localStorage
    }
  )
);