import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExamStore } from "@/stores/examStore";
import QuestionView from "./questionView";
import {
  useQuestionStore,
  useIsSectionLocked,
} from "@/stores/questionStore";
import { Lock } from "lucide-react";

/** Single tab trigger that checks lock state for SEQUENTIAL exams */
function SectionTab({
  sectionId,
  sectionName,
}: {
  sectionId: string;
  sectionName: string;
}) {
  const isLocked = useIsSectionLocked(sectionId);

  return (
    <TabsTrigger
      className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600
                 bg-white border border-blue-200 text-gray-700 data-[state=active]:text-white hover:cursor-pointer
                 text-xs md:text-sm xl:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      value={sectionId}
      disabled={isLocked}
    >
      <span className="flex items-center gap-1.5">
        {isLocked && <Lock className="h-3 w-3" />}
        {sectionName}
      </span>
    </TabsTrigger>
  );
}

function QuestionPanel() {
  const { examData } = useExamStore();
  const activeSectionId = useQuestionStore((s) => s.activeSectionId);
  const setActiveSection = useQuestionStore((s) => s.setActiveSection);

  const sections = examData?.section;

  if (!sections || sections.length === 0) return null;

  const handleTabSwitch = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Tabs
        value={activeSectionId ?? sections[0]._id}
        onValueChange={handleTabSwitch}
        className="w-full flex-1 flex flex-col overflow-hidden"
      >
        {/* Scrollable wrapper for TabsList */}
        <div className="overflow-x-auto scrollbar-hide py-2 shrink-0">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-2 bg-white border-0">
            {sections.map((item) => (
              <SectionTab
                key={item._id}
                sectionId={item._id}
                sectionName={item.sectionName}
              />
            ))}
          </TabsList>
        </div>

        {sections.map((item) => (
          <TabsContent
            value={item._id}
            key={item._id}
            className="flex-1 overflow-hidden mt-0"
          >
            <QuestionView />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default QuestionPanel;
