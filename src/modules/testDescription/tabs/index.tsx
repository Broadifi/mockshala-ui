import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DifficultyTable } from "../dificultyLevels.tsx/difficultyTable";
import { useState } from "react";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";
import { formattingWord } from "@/utils/formatting/formattingWord";

interface DifficultyProps {
  formatDifficulties: string[];
}

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}


export function TabsByType({ formatDifficulties }: DifficultyProps) {
  //fetch all test data
  const { testData }: StoreDataProps = useTestDescriptionStore();


  const [activeTab, setActiveTab] = useState(formatDifficulties[0]);

  const handleTabSwitch = (currentTab: string)=> {
    console.log(currentTab);
    
    setActiveTab(()=> (currentTab))
  }

   const filterData = testData?.tests.filter(test => {
    const matchDifficulty = activeTab
      ? formattingWord(test.difficultyLevel) === activeTab
      : true;

    return matchDifficulty ;
  });

  // console.log(filterData);
  
  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabSwitch}
      orientation="vertical"
      className="w-[400px]"
    >
      <TabsList>
        {formatDifficulties.map((item: string) => (
          <TabsTrigger value={item} key={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>

      {formatDifficulties.map((item: string) => (
        <TabsContent key={item} value={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#002966]">{item} Level</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <DifficultyTable filterData={filterData ?? []}/>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
