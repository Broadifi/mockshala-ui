import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question, StartExamData } from "@/api/model/exam-model";

interface QuestionStoreState {
  questions: Question[];
  currentQuestionIndex: string | null;

  setQuestionsFromExam: (examData: StartExamData) => void;
  setCurrentQuestion: (index: string) => void;

  saveAnswer: (questionId: string, optionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  markVisited: (questionId: string) => void;

  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionStoreState>()(
  persist(
    (set) => ({
      questions: [],
      currentQuestionIndex: null,

      // flatten section questions
      setQuestionsFromExam: (examData) => {
        const questions =
          examData?.section.flatMap((section) => section.questions) ?? [];

        set({ questions });
      },

      setCurrentQuestion: (index) => {
        set({ currentQuestionIndex: index });
      },

      saveAnswer: (questionId, optionId) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId ? { ...q, answerId: optionId } : q
          ),
        }));
      },

      toggleMarkForReview: (questionId) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId
              ? { ...q, isMarkedForReview: !q.isMarkedForReview }
              : q
          ),
        }));
      },

      markVisited: (questionId) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId ? { ...q, isVisited: true } : q
          ),
        }));
      },

      // clear store + localStorage
      clearQuestions: () => {
        set({
          questions: [],
          currentQuestionIndex: null,
        });
      },
    }),
    {
      name: "exam-question-store",
      partialize: (state) => ({
        questions: state.questions,
        currentQuestionIndex: state.currentQuestionIndex,
      }),
    }
  )
);