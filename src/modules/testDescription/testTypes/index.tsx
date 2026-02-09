import type { TestDetailsData } from "@/api/model/test-model";

import { useTestDescriptionStore } from "@/stores/testStore";
import { formattingWord } from "@/utils/formatting/formattingWord";
import React from "react";
import { TabsByType } from "../tabs";
import { TabsByTypeMobile } from "../tabs/tabsforMobile";
import { useBreakpoints } from "@/hooks/useBreakpoints";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function GroupByTestType() {
  const { testData }: StoreDataProps = useTestDescriptionStore();

   // Fetch the width of screen
    const width = useBreakpoints("lg");

  //Fetch what are the difficulties have in this test
    const testTypes = [...new Set(testData?.tests.map(test => test.testType))];

  const formatTypes = testTypes.map(type => {
    return formattingWord(type);
  });


  // console.log(typeof formatTypes);

  return (
    <div>
      {
        width ?   <TabsByType formatCategory={formatTypes} formatType="testType"/> :
        <TabsByTypeMobile formatCategory={formatTypes} formatType="testType"/>
      }
     
        
     
    </div>
  );
}

export default GroupByTestType;
