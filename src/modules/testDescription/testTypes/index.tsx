import { useTestDescriptionStore } from "@/stores/testStore";
import { formattingWord } from "@/utils/formatting/formattingWord";
import { TabsByType } from "../tabs";
import { TabsByTypeMobile } from "../tabs/tabsforMobile";
import { useBreakpoints } from "@/hooks/useBreakpoints";

function GroupByTestType() {
  const { tests } = useTestDescriptionStore();

  // Fetch the width of screen
  const width = useBreakpoints("lg");

  //Fetch what are the test types have in this test
  const testTypes = [...new Set(tests.map((test) => test.testType))];

  const formatTypes = testTypes.map((type) => {
    return formattingWord(type);
  });

  // console.log(typeof formatTypes);

  return (
    <div>
      {width ? (
        <TabsByType formatCategory={formatTypes} formatType="testType" />
      ) : (
        <TabsByTypeMobile formatCategory={formatTypes} formatType="testType" />
      )}
    </div>
  );
}

export default GroupByTestType;
