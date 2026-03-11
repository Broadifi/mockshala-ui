import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useExamStore } from "@/stores/examStore";
import { useEffect, useState } from "react";
import QuestionView from "./questionView";
import { useQuestionStore } from "@/stores/questionStore";

function QuestionPanel() {
  const { examData } = useExamStore();

  const { setCurrentQuestion } = useQuestionStore();

  const sectionName = examData?.section[0].sectionName;

  const sections = examData?.section;

  // console.log("Section data", sections);

  useEffect(() => {
  const firstQuestionId = sections?.[0]?.questions?.[0]?._id;

  if (firstQuestionId) {
    setCurrentQuestion(firstQuestionId);
  }
}, [sections, setCurrentQuestion]);


  const [activeTab, setActiveTab] = useState(sectionName);

  const handleTabSwitch = (currentTab: string) => {
    setActiveTab(currentTab);

    const section = sections?.find((item) => item.sectionName === currentTab);

    const firstQuestionId = section?.questions?.[0]?._id;

    if (firstQuestionId) {
      setCurrentQuestion(firstQuestionId);
    }
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={handleTabSwitch}
        className="w-full "
      >
        {/* Scrollable wrapper for TabsList */}
        <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:mx-0 lg:px-0 py-2">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-2 bg-white border-0">
            {sections?.map((item) => (
              <TabsTrigger
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600
                 bg-white border border-blue-200 text-gray-700 data-[state=active]:text-white hover:cursor-pointer"
                value={item.sectionName}
                key={item._id}
              >
                {item.sectionName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections?.map((item) => (
          <TabsContent value={item.sectionName} key={item._id}>
            <QuestionView />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default QuestionPanel;
