import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type {
  Question,
  Section,
  StartExamData,
} from "@/api/model/exam-model";
import type { SubmitExamPayload } from "@/api/model/submitExam-model";

// ─── Question Status (for palette coloring) ───────────────────────────
export type QuestionStatus =
  | "answered"
  | "notAnswered"
  | "marked"
  | "markedAndAnswered"
  | "notVisited";

export function getQuestionStatus(q: Question): QuestionStatus {
  const hasAnswer = !!q.answerId;
  if (q.isMarkedForReview && hasAnswer) return "markedAndAnswered";
  if (q.isMarkedForReview) return "marked";
  if (hasAnswer) return "answered";
  if (q.isVisited) return "notAnswered";
  return "notVisited";
}

// ─── Counts ───────────────────────────────────────────────────────────
export interface QuestionCounts {
  answered: number;
  notAnswered: number;
  marked: number;
  markedAndAnswered: number;
  notVisited: number;
}

function computeCounts(questions: Question[]): QuestionCounts {
  const counts: QuestionCounts = {
    answered: 0,
    notAnswered: 0,
    marked: 0,
    markedAndAnswered: 0,
    notVisited: 0,
  };
  for (const q of questions) {
    counts[getQuestionStatus(q)]++;
  }
  return counts;
}

// ─── Helper: find section that owns a question ───────────────────────
function findSectionForQuestion(
  sections: Section[],
  questionId: string
): Section | undefined {
  return sections.find((s) =>
    s.questions.some((q) => q._id === questionId)
  );
}

interface QuestionStoreState {
  // ── State ──
  sections: Section[];
  currentQuestionId: string | null;
  activeSectionId: string | null;
  examType: "NORMAL" | "SEQUENTIAL";
  examId: string | null;

  // Timer (persisted)
  timerStartedAt: number | null; // Date.now() when timer started
  timerDuration: number; // total seconds for countdown

  // Transient: selected on current question but NOT yet saved. Cleared on navigation.
  pendingAnswerId: string | null;
  pendingAnswerText: string | null;

  // SEQUENTIAL tracking
  completedSections: string[]; // section _ids that are done

  // ── Actions ──
  setQuestionsFromExam: (examData: StartExamData) => void;
  setCurrentQuestion: (questionId: string) => void;
  setActiveSection: (sectionId: string) => void;

  setPendingAnswer: (optionId: string | null, optionText: string | null) => void;

  saveAnswer: (questionId: string, optionId: string, optionText: string) => void;
  clearResponse: (questionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  markVisited: (questionId: string) => void;

  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  saveAndNext: (questionId: string, optionId: string, optionText: string) => void;

  // SEQUENTIAL
  advanceToNextSection: () => void;

  // Timer
  initTimer: () => void;

  // Reset
  clearQuestions: () => void;
}

// ─── Helper: update a question inside sections ──────────────────────
function updateQuestionInSections(
  sections: Section[],
  questionId: string,
  updater: (q: Question) => Question
): Section[] {
  return sections.map((s) => ({
    ...s,
    questions: s.questions.map((q) =>
      q._id === questionId ? updater(q) : q
    ),
  }));
}

// ─── All questions flattened (utility) ──────────────────────────────
function flattenQuestions(sections: Section[]): Question[] {
  return sections.flatMap((s) => s.questions);
}

// ─── Store ──────────────────────────────────────────────────────────
export const useQuestionStore = create<QuestionStoreState>()(
  persist(
    (set, get) => ({
      sections: [],
      currentQuestionId: null,
      activeSectionId: null,
      examType: "NORMAL",
      examId: null,
      timerStartedAt: null,
      timerDuration: 0,
      completedSections: [],
      pendingAnswerId: null,
      pendingAnswerText: null,

      // ── Init from exam data ──────────────────────────────────────
      setQuestionsFromExam: (examData) => {
        const sections = examData.section ?? [];
        const firstSection = sections[0];
        const firstQuestionId = firstSection?.questions?.[0]?._id ?? null;
        const examType =
          examData.examType === "SEQUENTIAL" ? "SEQUENTIAL" : "NORMAL";

        // Timer duration: NORMAL → total exam time, SEQUENTIAL → first section time
        const timerDuration =
          examType === "NORMAL"
            ? (examData.time ?? 0)
            : (firstSection?.time ?? 0);

        set({
          sections,
          currentQuestionId: firstQuestionId,
          activeSectionId: firstSection?._id ?? null,
          examType,
          examId: examData._id,
          timerDuration,
          timerStartedAt: null, // will be set by initTimer
          completedSections: [],
        });
      },

      // ── Set current question (auto-syncs tab) ────────────────────
      setCurrentQuestion: (questionId) => {
        const { sections, examType, completedSections } = get();
        const section = findSectionForQuestion(sections, questionId);
        if (!section) return;

        // SEQUENTIAL: block navigation to locked sections
        if (
          examType === "SEQUENTIAL" &&
          section._id !== get().activeSectionId &&
          completedSections.includes(section._id)
        ) {
          return;
        }

        // Initialize pending state from the question's saved data
        const currentQ = flattenQuestions(sections).find(q => q._id === questionId);

        set({
          currentQuestionId: questionId,
          activeSectionId: section._id,
          pendingAnswerId: currentQ?.answerId ?? null,
          pendingAnswerText: currentQ?.answerText ?? null,
        });
      },

      // ── Set active section (auto-sets first question) ────────────
      setActiveSection: (sectionId) => {
        const { sections, examType, completedSections, activeSectionId } =
          get();

        // SEQUENTIAL: only allow switching to active or completed sections
        if (examType === "SEQUENTIAL") {
          if (
            sectionId !== activeSectionId &&
            completedSections.includes(sectionId)
          ) {
            return;
          }
        }

        const section = sections.find((s) => s._id === sectionId);
        if (!section) return;

        const firstQuestionId = section.questions?.[0]?._id ?? null;

        set({
          activeSectionId: sectionId,
          currentQuestionId: firstQuestionId,
        });
      },

      setPendingAnswer: (optionId, optionText) => {
        set({ pendingAnswerId: optionId, pendingAnswerText: optionText });
      },

      // ── Save answer ──────────────────────────────────────────────
      saveAnswer: (questionId, optionId, optionText) => {
        set((state) => ({
          sections: updateQuestionInSections(
            state.sections,
            questionId,
            (q) => ({
              ...q,
              answerId: optionId,
              answerText: optionText,
              isVisited: true,
            })
          ),
        }));
      },

      // ── Clear response ───────────────────────────────────────────
      clearResponse: (questionId) => {
        set((state) => ({
          pendingAnswerId: null,
          pendingAnswerText: null,
          sections: updateQuestionInSections(
            state.sections,
            questionId,
            (q) => ({
              ...q,
              answerId: null,
              answerText: null,
            })
          ),
        }));
      },

      // ── Toggle mark for review ───────────────────────────────────
      toggleMarkForReview: (questionId) => {
        set((state) => ({
          sections: updateQuestionInSections(
            state.sections,
            questionId,
            (q) => ({
              ...q,
              isMarkedForReview: !q.isMarkedForReview,
              isVisited: true,
            })
          ),
        }));
      },

      // ── Mark visited ─────────────────────────────────────────────
      markVisited: (questionId) => {
        // Guard: skip if already visited to prevent unnecessary state updates
        const allQ = get().sections.flatMap((s) => s.questions);
        const q = allQ.find((item) => item._id === questionId);
        if (q?.isVisited) return;

        set((state) => ({
          sections: updateQuestionInSections(
            state.sections,
            questionId,
            (q) => ({
              ...q,
              isVisited: true,
            })
          ),
        }));
      },

      // ── Go to next question ──────────────────────────────────────
      goToNextQuestion: () => {
        const { sections, currentQuestionId, examType, activeSectionId } =
          get();

        if (examType === "NORMAL") {
          // Flatten all questions and find next
          const allQuestions = flattenQuestions(sections);
          const currentIdx = allQuestions.findIndex(
            (q) => q._id === currentQuestionId
          );
          if (currentIdx < allQuestions.length - 1) {
            const nextQ = allQuestions[currentIdx + 1];
            const nextSection = findSectionForQuestion(sections, nextQ._id);
            set({
              currentQuestionId: nextQ._id,
              activeSectionId: nextSection?._id ?? activeSectionId,
            });
          }
        } else {
          // SEQUENTIAL: only within current section
          const section = sections.find((s) => s._id === activeSectionId);
          if (!section) return;
          const currentIdx = section.questions.findIndex(
            (q) => q._id === currentQuestionId
          );
          if (currentIdx < section.questions.length - 1) {
            set({
              currentQuestionId: section.questions[currentIdx + 1]._id,
            });
          }
        }
      },

      // ── Go to previous question ─────────────────────────────────
      goToPreviousQuestion: () => {
        const { sections, currentQuestionId, examType, activeSectionId } =
          get();

        if (examType === "NORMAL") {
          const allQuestions = flattenQuestions(sections);
          const currentIdx = allQuestions.findIndex(
            (q) => q._id === currentQuestionId
          );
          if (currentIdx > 0) {
            const prevQ = allQuestions[currentIdx - 1];
            const prevSection = findSectionForQuestion(sections, prevQ._id);
            set({
              currentQuestionId: prevQ._id,
              activeSectionId: prevSection?._id ?? activeSectionId,
            });
          }
        } else {
          // SEQUENTIAL: only within current section
          const section = sections.find((s) => s._id === activeSectionId);
          if (!section) return;
          const currentIdx = section.questions.findIndex(
            (q) => q._id === currentQuestionId
          );
          if (currentIdx > 0) {
            set({
              currentQuestionId: section.questions[currentIdx - 1]._id,
            });
          }
        }
      },

      // ── Save answer and advance ─────────────────────────────────
      saveAndNext: (questionId, optionId, optionText) => {
        const { saveAnswer, goToNextQuestion, markVisited } = get();
        if (optionId) {
          saveAnswer(questionId, optionId, optionText);
        } else {
          markVisited(questionId);
        }
        goToNextQuestion();
      },

      // ── SEQUENTIAL: advance to next section ─────────────────────
      advanceToNextSection: () => {
        const { sections, activeSectionId, completedSections } = get();
        const currentIdx = sections.findIndex(
          (s) => s._id === activeSectionId
        );
        if (currentIdx === -1) return;

        const newCompleted = [
          ...completedSections,
          sections[currentIdx]._id,
        ];

        // If there's a next section, switch to it
        if (currentIdx < sections.length - 1) {
          const nextSection = sections[currentIdx + 1];
          set({
            completedSections: newCompleted,
            activeSectionId: nextSection._id,
            currentQuestionId: nextSection.questions?.[0]?._id ?? null,
            timerStartedAt: Date.now(),
            timerDuration: nextSection.time ?? 0,
          });
        } else {
          // All sections completed
          set({ completedSections: newCompleted });
        }
      },

      // ── Init timer ──────────────────────────────────────────────
      initTimer: () => {
        const { timerStartedAt } = get();
        // Only set if not already started (preserves across refresh)
        if (!timerStartedAt) {
          set({ timerStartedAt: Date.now() });
        }
      },

      // ── Clear everything ────────────────────────────────────────
      clearQuestions: () => {
        set({
          sections: [],
          currentQuestionId: null,
          activeSectionId: null,
          examType: "NORMAL",
          examId: null,
          timerStartedAt: null,
          timerDuration: 0,
          completedSections: [],
        });
      },
    }),
    {
      name: "exam-question-store",
      partialize: (state) => ({
        sections: state.sections,
        currentQuestionId: state.currentQuestionId,
        activeSectionId: state.activeSectionId,
        examType: state.examType,
        examId: state.examId,
        timerStartedAt: state.timerStartedAt,
        timerDuration: state.timerDuration,
        completedSections: state.completedSections,
      }),
    }
  )
);

// ═══════════════════════════════════════════════════════════════════════
// SELECTORS (standalone hooks)
// ═══════════════════════════════════════════════════════════════════════

/** Current question — uses currentQuestionId to avoid new refs */
export function useCurrentQuestion(): Question | undefined {
  const currentQuestionId = useQuestionStore(
    (s) => s.currentQuestionId
  );
  const sections = useQuestionStore((s) => s.sections);

  if (!currentQuestionId || sections.length === 0) return undefined;

  for (const section of sections) {
    const q = section.questions.find(
      (q) => q._id === currentQuestionId
    );
    if (q) return q;
  }
  return undefined;
}

/**
 * Questions for the palette:
 * NORMAL → all questions, SEQUENTIAL → current section only
 * Uses useShallow to prevent infinite re-renders from new array refs
 */
export function usePaletteQuestions(): Question[] {
  return useQuestionStore(
    useShallow((state) => {
      if (state.examType === "SEQUENTIAL") {
        const section = state.sections.find(
          (s) => s._id === state.activeSectionId
        );
        return section?.questions ?? [];
      }
      return flattenQuestions(state.sections);
    })
  );
}

/** Counts for the status bar — useShallow prevents new object refs */
export function useQuestionCounts(): QuestionCounts {
  return useQuestionStore(
    useShallow((state) => {
      const allQ = flattenQuestions(state.sections);
      return computeCounts(allQ);
    })
  );
}

/** Whether a section is locked (SEQUENTIAL only) */
export function useIsSectionLocked(sectionId: string): boolean {
  return useQuestionStore((state) => {
    if (state.examType !== "SEQUENTIAL") return false;
    // Active section is not locked
    if (state.activeSectionId === sectionId) return false;
    // Completed sections are not locked
    // if (state.completedSections.includes(sectionId)) return false;
    return true;
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SUBMIT PAYLOAD BUILDER (non-hook)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Build SubmitExamPayload from current store + examStore data.
 * Call this when the user clicks Submit.
 */
export function getSubmitPayload(
  examData: StartExamData
): SubmitExamPayload {
  const { sections } = useQuestionStore.getState();

  return {
    _id: examData._id,
    testSeries: examData.testSeries,
    test: examData.test,
    user: examData.user,
    time: examData.time,
    examType: examData.examType,
    completedTime: examData.completedTime,
    isSubmitted: true,
    createdAt: examData.createdAt,
    updatedAt: examData.updatedAt,
    section: sections.map((s) => ({
      time: s.time,
      completedTime: s.completedTime,
      _id: s._id,
      sectionName: s.sectionName,
      questions: s.questions.map((q) => ({
        questionType: q.questionType,
        answerText: (q.answerText as string) ?? "",
        answerId: (q.answerId as string) ?? "",
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        marksObtained: q.marksObtained,
        isCorrect: q.isCorrect,
        _id: q._id,
        questionRef: q.questionRef,
        questionText: q.questionText,
        options: q.options.map((o) => ({
          _id: o._id,
          optionText: o.optionText,
        })),
        difficultyLevel: q.difficultyLevel,
        subject: q.subject,
        topic: Array.isArray(q.topic)
          ? q.topic.filter(Boolean).join(", ")
          : q.topic,
        chapter: Array.isArray(q.chapter)
          ? q.chapter.filter(Boolean).join(", ")
          : q.chapter,
        paragraphRef: q.paragraphRef,
        paragraphText: q.paragraphText,
      })),
    })),
  };
}