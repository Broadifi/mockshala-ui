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

function GroupByTestType() {
  const { testData }: StoreDataProps = useTestDescriptionStore();

  //Fetch what are the difficulties have in this test
    const testTypes = [...new Set(testData?.tests.map(test => test.testType))];

  const formatTypes = testTypes.map(type => {
    return formattingWord(type);
  });


  // console.log(typeof formatTypes);

  return (
    <div>
      <Card>
        <CardContent className="text-muted-foreground text-sm overflow-x-auto">
          <TabsByType formatCategory={formatTypes} formatType="testType"/>
        </CardContent>
      </Card>
    </div>
  );
}

export default GroupByTestType;
