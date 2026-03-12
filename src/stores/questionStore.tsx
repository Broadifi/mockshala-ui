import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question, StartExamData } from "@/api/model/exam-model";

interface OptionsProps {
  optionId: string;
  optionText: string;
}

interface QuestionStoreState {
  questions: Question[];
  currentQuestionId: string | null;

  setQuestionsFromExam: (examData: StartExamData) => void;
  setCurrentQuestionId: (index: string) => void;

  currentQuestion: Question| null;

  saveAnswer: (questionId: string, valueData: OptionsProps) => void;
  toggleMarkForReview: (questionId: string) => void;
  markVisited: (questionId: string) => void;

  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionStoreState>()(
  persist(
    (set) => ({
      questions: [],
      currentQuestionId: null,

      // flatten section questions
      setQuestionsFromExam: (examData) => {
        const questions =
          examData?.section.flatMap((section) => section.questions) ?? [];

        set({ questions });
      },

      setCurrentQuestionId: (index) => {
        set({ currentQuestionId: index });
      },

      currentQuestion: null,

      setCurrentQuestion: () =>{
        
      },

      saveAnswer: (questionId, valueData: OptionsProps) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId
              ? {
                  ...q,
                  answerText: valueData.optionText,
                  answerId: valueData.optionId,
                }
              : q,
          ),
        }));
      },

      toggleMarkForReview: (questionId) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId
              ? { ...q, isMarkedForReview: !q.isMarkedForReview }
              : q,
          ),
        }));
      },

      markVisited: (questionId) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q._id === questionId ? { ...q, isVisited: true } : q,
          ),
        }));
      },

      // clear store + localStorage
      clearQuestions: () => {
        set({
          questions: [],
          currentQuestionId: null,
        });
      },
    }),
    {
      name: "exam-question-store",
      partialize: (state) => ({
        questions: state.questions,
        currentQuestionId: state.currentQuestionId,
      }),
    },
  ),
);

export const useCurrentQuestion = () => {
  const currentQuestion = useQuestionStore((state) =>
    state.questions.find((q) => q._id === state.currentQuestionId),
  );
  return currentQuestion;
};
