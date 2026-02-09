import type { TestDetailsData } from "@/api/model/test-model";
import {

} from "@/components/ui/card";
import { useTestDescriptionStore } from "@/stores/testStore";
import { formattingWord } from "@/utils/formatting/formattingWord";

import { TabsByType } from "../tabs";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { TabsByTypeMobile } from "../tabs/tabsforMobile";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function GroupByDifficulty() {
  const { testData }: StoreDataProps = useTestDescriptionStore();

  // Fetch the width of screen
  const width = useBreakpoints("lg");
  //Fetch what are the difficulties have in this test
  const difficulties = [
    ...new Set(testData?.tests.map((test) => test.difficultyLevel)),
  ];

  //Just format the difficulties name
  const formatDifficulties = difficulties.map((test) => {
    return formattingWord(test);
  });

  // console.log(typeof formatDifficulties);

  return (
    <div>
    {
      width ? <TabsByType formatCategory={formatDifficulties} formatType="difficulty"/> :
      <TabsByTypeMobile formatCategory={formatDifficulties} formatType="difficulty"/>
    }
          
        
    </div>
  );
}

export default GroupByDifficulty;
