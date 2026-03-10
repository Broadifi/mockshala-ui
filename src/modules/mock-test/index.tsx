import { useExamStore } from "@/stores/examStore";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";
import { useAuthStore } from "@/stores/authStore";
import ProfileIconExam from "@/components/profileIconExam";
import { useExamLanguage } from "@/stores/examLanguageStore";
import i18n from "@/i18n";

function MockTest() {
  const { examData } = useExamStore();

  if (!examData) {
    return <div>Loading exam data...</div>;
  }

  const { userDetails } = useAuthStore((state) => state.auth);
  const candidateName = userDetails?.name;

  //fetch current language and 118n data

  const { examCurrentLang } = useExamLanguage();

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
    <div className="w-full">
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

      <div className=" px-4 py-2 mx-auto">

        {/* Exam Name and color code */}
        <div className="flex flex-col min-[1050px]:flex-row justify-between gap-3 lg:gap-4 border-b border-gray-200 py-2 items-center w-full" >
          {/* Name */}
          <div className="w-full min-[1050px]:max-w-[40%]">
            <h1 className="text-base md:text-lg min-[1050px]:text-xl  text-title-darkblue font-semibold">
              {/* {examData.testName} */}
              CUET UG 2026 is a national-level entrance exam conducted by the National
            </h1>
          </div>

          {/* Color Palette  and counts */}
          <div className="flex flex-wrap gap-3 lg:gap-4 w-full min-[1050px]:max-w-[40%] justify-start min-[1050px]:justify-end">
            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 bg-answered rounded-sm"></div>
                <span className="text-responsive-muted uppercase">
                  {getLocalTranslation("examInstructions.answered")}{":"}
                </span>
                <p className="0 text-xs sm:text-sm text-answered font-medium">10</p>
              </div>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 bg-notAnswered rounded-sm"></div>
                <span className="text-responsive-muted uppercase">
                  {getLocalTranslation("examInstructions.notAnswered")}{":"}
                </span>
                 <p className=" text-xs sm:text-sm text-notAnswered font-medium">56</p>
              </div>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 bg-marked rounded-sm"></div>
                <span className="text-responsive-muted uppercase">
                  {getLocalTranslation("examInstructions.marked")}{":"}
                </span>
                 <p className=" text-xs sm:text-sm text-marked font-medium">3</p>
              </div>
            </div>

            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 bg-markedAnswered rounded-sm"></div>
                <span className="text-responsive-muted uppercase">
                  {getLocalTranslation("examInstructions.markedAnswered")}{":"}
                </span>
                 <p className=" text-xs sm:text-sm text-markedAnswered font-medium">8</p>
              </div>
            </div>

            <div>
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 lg:h-4 lg:w-4 bg-notVisited border border-gray-300 rounded-sm"></div>
                <span className="text-responsive-muted uppercase">
                  {getLocalTranslation("examInstructions.notVisited")}{":"}
                </span>
                 <p className="text-gray-600 text-xs sm:text-sm font-medium">45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTest;
