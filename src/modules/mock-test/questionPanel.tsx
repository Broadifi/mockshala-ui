import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent} from "@/components/ui/card";
import Marks from "./marks";
import { useExamStore } from "@/stores/examStore";
import { useState } from "react";
import HtmlSetterExam from "@/components/htmlsetterforExam";
import QuestionOptions from "./QuestionOptions";

function QuestionPanel() {
  const { examData } = useExamStore();

  const sectionName = examData?.section[0].sectionName;

  const sections = examData?.section;

  console.log("Section data", sections);
  

  const [activeTab, setActiveTab] = useState(sectionName);

  const handleTabSwitch = (currentTab: string) => {
    setActiveTab(() => currentTab);
  };

  const questionIndex = 0;

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
            <Card className="border border-gray-150 shadow-none ">
              <div className="px-0 lg:px-6 py-0">
                <div className="flex justify-between">
                  <p className="text-title-darkblue font-semibold">
                    Question {questionIndex + 1}
                  </p>
                  <Marks marks={item.questions[questionIndex].marks} negativeMarks={item.questions[questionIndex].negativeMarks}/>
                </div>
              </div>

              <CardContent className="text-muted-foreground text-sm px-0 lg:px-6 h-[55vh] overflow-y-auto">
                <HtmlSetterExam
                  html={item.questions[questionIndex].questionText}
                />

                <div>
                  <QuestionOptions 
                    options={item.questions[questionIndex].options}
                   
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default QuestionPanel;
