import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DifficultyTable } from "../difficultyLevels/difficultyTable";
import { useState } from "react";
import { useTestDescriptionStore } from "@/stores/testStore";
import { formattingWord } from "@/utils/formatting/formattingWord";
import { TestTypeTable } from "../testTypes/testTypeTable";

interface DifficultyProps {
  formatCategory: string[];
  formatType: string;
}

export function TabsByType({ formatCategory, formatType }: DifficultyProps) {
  //fetch all test data
  const { tests } = useTestDescriptionStore();

  const [activeTab, setActiveTab] = useState(formatCategory[0]);

  const handleTabSwitch = (currentTab: string) => {
    // console.log(currentTab);

    setActiveTab(() => currentTab);
  };

  function getFilterData(formatType: string) {
    if (formatType === "difficulty") {
      const filterDifficultyData = tests.filter((test) => {
        const matchDifficulty = activeTab
          ? formattingWord(test.difficultyLevel) === activeTab
          : true;

        return matchDifficulty;
      });

      return filterDifficultyData;
    } else if (formatType === "testType") {
      const filterTestTypeData = tests.filter((test) => {
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

  // console.log(filterData);

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabSwitch}
      orientation="vertical"
      className="w-[400px]"
    >
      <TabsList>
        {formatCategory.map((item: string) => (
          <TabsTrigger value={item} key={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>

      {formatCategory.map((item: string) => (
        <TabsContent key={item} value={item}>
          <Card>
            {/* <CardHeader>
              <CardTitle className="text-[#002966]">{item} Level</CardTitle>
            </CardHeader> */}
            <CardContent className="text-muted-foreground text-sm ">
              {formatType === "difficulty" ? (
                <DifficultyTable filterData={finalFilterData ?? []} />
              ) : (
                <TestTypeTable filterData={finalFilterData ?? []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
