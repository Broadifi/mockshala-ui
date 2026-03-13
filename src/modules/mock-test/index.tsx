import { useEffect } from "react";
import { useExamStore } from "@/stores/examStore";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";
import { useAuthStore } from "@/stores/authStore";
import ProfileIconExam from "@/components/profileIconExam";
import { useExamLanguage } from "@/stores/examLanguageStore";
import i18n from "@/i18n";
import QuestionPanel from "./questionPanel";
import QuestionNumbers from "./questionNumbers";
import TestNavigation from "./testNavigation";
import SubmitSection from "./submitSection";
import {
  useQuestionStore,
  useQuestionCounts,
} from "@/stores/questionStore";

function MockTest() {
  const { examData } = useExamStore();
  const { userDetails } = useAuthStore((state) => state.auth);
  const { examCurrentLang } = useExamLanguage();

  const setQuestionsFromExam = useQuestionStore(
    (s) => s.setQuestionsFromExam
  );
  const initTimer = useQuestionStore((s) => s.initTimer);
  const sections = useQuestionStore((s) => s.sections);
  const counts = useQuestionCounts();

  // Initialize store + timer once when exam data is available.
  // IMPORTANT: Only call setQuestionsFromExam if sections are empty (fresh start).
  // If sections already exist in the persisted store (e.g. after a page refresh),
  // we skip re-initialization to preserve saved answers, visited states, and the timer.
  useEffect(() => {
    if (examData && sections.length === 0) {
      setQuestionsFromExam(examData);
    }
    // Always try to start the timer — initTimer is a no-op if already started
    queueMicrotask(() => initTimer());
  }, [examData, sections.length, setQuestionsFromExam, initTimer]);

  if (!examData) {
    return <div>Loading exam data...</div>;
  }

  const candidateName = userDetails?.name;

  const getLocalTranslation = (key: string): string => {
    const bundle = i18n.getResourceBundle(
      examCurrentLang,
      "translation",
    ) as Record<string, unknown>;

    return (
      (key.split(".").reduce<unknown>((acc, k) => {
        if (typeof acc === "object" && acc !== null && k in acc) {
          return (acc as Record<string, unknown>)[k];
        }
        return undefined;
      }, bundle) as string) || key
    );
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="w-full bg-white shadow-md z-50">
        <header className="px-4 py-2 mx-auto flex justify-between items-center">
          <div>
            <ImageWithFallback
              src={mockShalaLogo}
              alt="mockShalaLogo"
              className="h-6 md:h-7 xl:h-8 w-auto"
            />
          </div>

          {/* Profile */}
          <div className="flex gap-2">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Candidate</p>
              <p className="text-sm sm:text-base font-medium sm:font-semibold text-title-darkblue">
                {candidateName}
              </p>
            </div>

            <div>
              <ProfileIconExam />
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto flex-1 flex flex-col w-full overflow-hidden">
        {/* Exam Name and color code */}
        <div className="flex max-xl:flex-col justify-between gap-3 xl:gap-8 px-4 pt-2 sm:pb-2 md:py-2 w-full shrink-0 ">
          {/* Name */}
          <div className="w-full xl:max-w-[40%]">
            <h1 className="text-base md:text-lg min-[1050px]:text-xl text-title-darkblue font-semibold">
              {examData.testName}
            </h1>
          </div>

          {/* Color Palette and counts */}
          <div
            className="flex max-lg:flex-wrap gap-3 xl:gap-2.5 
            xl:border xl:border-gray-200 rounded-xl xl:px-2 xl:py-1 h-max xl:w-max xl:shrink-0"
          >
            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3  bg-answered rounded-sm"></div>
                <span className="text-responsive-sm uppercase">
                  {getLocalTranslation("examInstructions.answered")}
                  {":"}
                </span>
                <p className=" text-xs sm:text-sm text-answered font-medium">
                  {counts.answered}
                </p>
              </div>
            </div>

            <div className="w-px bg-gray-300 max-xl:hidden" />
            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 bg-notAnswered rounded-sm"></div>
                <span className="text-responsive-sm uppercase">
                  {getLocalTranslation("examInstructions.notAnswered")}
                  {":"}
                </span>
                <p className=" text-xs sm:text-sm text-notAnswered font-medium">
                  {counts.notAnswered}
                </p>
              </div>
            </div>
            <div className="w-px bg-gray-300 max-xl:hidden" />

            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3  bg-marked rounded-sm"></div>
                <span className="text-responsive-sm uppercase">
                  {getLocalTranslation("examInstructions.marked")}
                  {":"}
                </span>
                <p className=" text-xs sm:text-sm text-marked font-medium">
                  {counts.marked}
                </p>
              </div>
            </div>

            <div className="w-px bg-gray-300 max-xl:hidden" />

            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 bg-markedAnswered rounded-sm"></div>
                <span className="text-responsive-sm uppercase">
                  {getLocalTranslation("examInstructions.markedAnswered")}
                  {":"}
                </span>
                <p className=" text-xs sm:text-sm text-markedAnswered font-medium">
                  {counts.markedAndAnswered}
                </p>
              </div>
            </div>

            <div className="w-px bg-gray-300 max-xl:hidden" />

            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 bg-notVisited border border-gray-300 rounded-sm"></div>
                <span className="text-responsive-sm uppercase">
                  {getLocalTranslation("examInstructions.notVisited")}
                  {":"}
                </span>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  {counts.notVisited}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white sm:bg-blue-50 flex-1 overflow-hidden">
          <div className="grid grid-cols-12 px-4 sm:py-4 mx-auto gap-4 h-full ">
            {/* LEFT PANEL */}
            <div className="col-span-12 lg:col-span-9 sm:border border-gray-100 bg-white rounded-lg  sm:px-4 py-2 flex flex-col overflow-hidden">
              {/* Question Area */}
              <div className="flex-1 overflow-hidden">
                <QuestionPanel />
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4 sm:pt-6 shrink-0">
                <TestNavigation />
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="max-lg:hidden col-span-12 lg:col-span-3 border border-gray-100 bg-white rounded-lg flex flex-col overflow-hidden">
              {/* Question Palette */}
              <div className="flex-1 overflow-hidden">
                <QuestionNumbers />
              </div>

              {/* Submit Section */}
              <div className="border-t p-4 shrink-0">
                <SubmitSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTest;
