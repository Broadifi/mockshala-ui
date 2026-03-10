import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Marks from "./marks";
import { useExamStore } from "@/stores/examStore";
import { useState } from "react";
import HtmlSetterExam from "@/components/htmlsetterforExam";

function QuestionPanel() {
  const { examData } = useExamStore();

  const sectionName = examData?.section[0].sectionName;

  const sections = examData?.section;

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
        className="w-full"
      >
        {/* Scrollable wrapper for TabsList */}
        <div className="relative -mx-4 px-4 overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:mx-0 lg:px-0">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-1 md:gap-2 lg:gap-5">
            {sections?.map((item) => (
              <TabsTrigger value={item.sectionName} key={item._id}>
                {item.sectionName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections?.map((item) => (
          <TabsContent value={item.sectionName} key={item._id}>
            <Card className="border-0 lg:border shadow-none lg:shadow">
              <CardHeader className="px-0 lg:px-6">
                <CardTitle className="flex justify-between">
                  <p className="text-title-darkblue ">Question {questionIndex+1}</p>
                  <Marks />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm px-0 lg:px-6">
                <HtmlSetterExam
                  html={item.questions[questionIndex].questionText}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default QuestionPanel;
