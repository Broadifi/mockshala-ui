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

function MockTest() {
  const { examData } = useExamStore();
  const { userDetails } = useAuthStore((state) => state.auth);
  const { examCurrentLang } = useExamLanguage();

  if (!examData) {
    return <div>Loading exam data...</div>;
  }

  const candidateName = userDetails?.name;

  //fetch current language and 118n data

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
    <div className="w-full min-h-screen relative">
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
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

      <div className="mx-auto ">
        {/* Exam Name and color code */}
        <div className="flex max-xl:flex-col justify-between gap-3 xl:gap-8 px-4 py-4  w-full">
          {/* Name */}
          <div className="w-full xl:max-w-[40%]">
            <h1 className="text-base md:text-lg min-[1050px]:text-xl text-title-darkblue font-semibold">
              {/* {examData.testName} */}
              CUET UG 2026 is a national-level entrance exam conducted by the
              National
            </h1>
          </div>

          {/* Color Palette  and counts */}
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
                  10
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
                  56
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
                <p className=" text-xs sm:text-sm text-marked font-medium">3</p>
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
                  8
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
                  45
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50">
          <div className="grid grid-cols-12 px-4 py-4 mx-auto gap-4 h-full min-h-[calc(100vh-125px)]">
            {/* LEFT PANEL */}
            <div className="col-span-9 border border-gray-100 bg-white rounded-lg p-4 flex flex-col justify-between">
              {/* Question Area */}
              <div className="flex-1">
                <QuestionPanel />
              </div>

              {/* Bottom Navigation */}
              <div className="pt-6">
                <TestNavigation />
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-span-3 border border-gray-100 bg-white rounded-lg flex flex-col justify-between">
              {/* Question Palette */}
              <div className="p-4 overflow-y-auto">
                <QuestionNumbers />
              </div>

              {/* Submit Section */}
              <div className="border-t p-4">
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
