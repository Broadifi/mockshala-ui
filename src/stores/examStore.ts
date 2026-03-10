import type { StartExamData } from "@/api/model/exam-model";
import { create } from "zustand";
import { cookiesKeys } from "@/lib/cookies.keys";
;

interface ExamStoreState {
  examData: StartExamData | null;
  setExamData: (data: StartExamData) => void;
  clearExamData: () => void;
}

export const useExamStore = create<ExamStoreState>()((set) => {
  let initExamData: StartExamData | null = null;

  const stored = window.localStorage.getItem(cookiesKeys.startExamData);
  if (stored) {
    try {
      initExamData = JSON.parse(stored);
    } catch {
      window.localStorage.removeItem(cookiesKeys.startExamData);
      initExamData = null;
    }
  }

  return {
    examData: initExamData,

    setExamData: (data) =>
      set((state) => {
        window.localStorage.setItem(cookiesKeys.startExamData, JSON.stringify(data));
        return { ...state, examData: data };
      }),

    clearExamData: () =>
      set((state) => {
        window.localStorage.removeItem(cookiesKeys.startExamData);
        return { ...state, examData: null };
      }),
  };
});
