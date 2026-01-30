import type { TestDetailsData } from "@/api/model/test-model";
import {
  Card,
  CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
} from "@/components/ui/card";
import { useTestDescriptionStore } from "@/stores/testStore";
import { formattingWord } from "@/utils/formatting/formattingWord";
import React from "react";
import { TabsByType } from "../tabs";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function GroupByDifficulty() {
  const { testData }: StoreDataProps = useTestDescriptionStore();

  //Fetch what are the difficulties have in this test
  const difficulties = [
    ...new Set(testData?.tests.map((test) => test.difficultyLevel)),
  ];

  //Just format the difficulties name
  const formatDifficulties = difficulties.map((test) => {
    return formattingWord(test);
  });

  console.log(typeof formatDifficulties);

  return (
    <div>
      <Card>
        <CardContent className="text-muted-foreground text-sm">
          <TabsByType formatDifficulties={formatDifficulties}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default GroupByDifficulty;
