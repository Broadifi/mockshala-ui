import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { useTestDescriptionStore } from "@/stores/testStore";
import type { TestDetailsData } from "@/api/model/test-model";
import { formattingWord } from "@/utils/formatting/formattingWord";

import AllTestMobile from "../allTests/allTestMobile";

interface DifficultyProps {
  formatCategory: string[];
  formatType: string;
}

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

export function TabsByTypeMobile({ formatCategory, formatType }: DifficultyProps) {
  //fetch all test data
  const { testData }: StoreDataProps = useTestDescriptionStore();

  // console.log(testData?.tests);
  
  const [activeTab, setActiveTab] = useState(formatCategory[0]);

  const handleTabSwitch = (currentTab: string) => {
    // console.log(currentTab);

    setActiveTab(() => currentTab);
  };

  function getFilterData(formatType: string) {
    if (formatType === "difficulty") {
      const filterDifficultyData = testData?.tests.filter((test) => {
        const matchDifficulty = activeTab
          ? formattingWord(test.difficultyLevel) === activeTab
          : true;

        return matchDifficulty;
      });

      return filterDifficultyData;
    } else if (formatType === "testType") {
      const filterTestTypeData = testData?.tests.filter((test) => {
        const matchType = activeTab
          ? formattingWord(test.testType) === activeTab
          : true;

        return matchType;
      });

      return filterTestTypeData;
    }
  }

  const finalFilterData = getFilterData(formatType);

  // console.log("you are switched to ", formatType);

  // console.log(finalFilterData);

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabSwitch}
      orientation="horizontal"
      className="w-full"
    >
      <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible ">
      <TabsList>
        {formatCategory.map((item: string) => (
          <TabsTrigger value={item} key={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      </div>
      {formatCategory.map((item: string) => (
        <TabsContent key={item} value={item} 
          className="border-0 shadow-none px-0 "
          >
          <Card
            className="border-0  shadow-none bg-soft-blue-gradient px-0"
          >
            {/* <CardHeader>
              <CardTitle className="text-[#002966]">{item} Level</CardTitle>
            </CardHeader> */}

            {/* <CardContent className="text-muted-foreground text-sm ">
              {formatType === "difficulty" ? (
                <DifficultyTable filterData={finalFilterData ?? []} />
              ) : (
                <TestTypeTable filterData={finalFilterData ?? []} />
              )}
            </CardContent> */}

            <CardContent className="text-muted-foreground text-sm px-0">
              {formatType === "difficulty" ? (
                <AllTestMobile filteredTests={finalFilterData ?? []} />
              ) : (
                <AllTestMobile filteredTests={finalFilterData ?? []} />
              )}
            </CardContent>

          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
