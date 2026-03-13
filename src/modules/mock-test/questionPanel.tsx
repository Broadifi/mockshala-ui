import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useExamStore } from "@/stores/examStore";
import { useEffect, useMemo } from "react";
import QuestionView from "./questionView";
import { useQuestionStore } from "@/stores/questionStore";

function QuestionPanel() {
  const { examData } = useExamStore();
  const { currentQuestionId, setCurrentQuestionId } = useQuestionStore();
  const markVisited = useQuestionStore((s) => s.markVisited);
  
  const sections = useMemo(() => examData?.section ?? [], [examData]);

  const activeTab = useMemo(() => {
    return (
      sections.find((sec) =>
        sec.questions.some((q) => q._id === currentQuestionId),
      )?.sectionName || sections?.[0]?.sectionName
    );
  }, [sections, currentQuestionId]);

  // Set first question initially
  useEffect(() => {
    const firstQuestionId = sections?.[0]?.questions?.[0]?._id;

    if (firstQuestionId && !currentQuestionId) {
      setCurrentQuestionId(firstQuestionId);
       markVisited(firstQuestionId);
    }
  }, [sections, currentQuestionId, setCurrentQuestionId]);

  const handleTabSwitch = (currentTab: string) => {
    const section = sections.find((item) => item.sectionName === currentTab);

    const firstQuestionId = section?.questions?.[0]?._id;

    if (firstQuestionId) {
      setCurrentQuestionId(firstQuestionId);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={handleTabSwitch}
        className="w-full flex-1 flex flex-col overflow-hidden  "
      >
        {/* Scrollable wrapper for TabsList */}
        <div className="overflow-x-auto scrollbar-hide py-2 shrink-0">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-2 bg-white border-0">
            {sections?.map((item) => (
              <TabsTrigger
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600
                 bg-white border border-blue-200 text-gray-700 data-[state=active]:text-white hover:cursor-pointer
                 text-xs md:text-sm xl:text-base "
                value={item.sectionName}
                key={item._id}
              >
                {item.sectionName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections?.map((item) => (
          <TabsContent
            value={item.sectionName}
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
