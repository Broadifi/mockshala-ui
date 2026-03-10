import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExamLanguageStore{
  examCurrentLang: string ;
  setExamLanguage: (lang:string) => void;
  clearExamLanguage: () => void;
}

export const useExamLanguage = create<ExamLanguageStore>()(
  persist(
    (set) => ({
      examCurrentLang: "en",

      setExamLanguage: (lang) =>
        set({ examCurrentLang: lang }),

      clearExamLanguage: () =>
        set({ examCurrentLang: "en" }),
    }),
    {
      name: "exam-language", // key in localStorage
    }
  )
);