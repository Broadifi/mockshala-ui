import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTests from "./allTests.tsx";
import GroupByDifficulty from "./dificultyLevels.tsx/index.tsx";
import GroupByTestType from "./testTypes.tsx/index.tsx";
import HtmlSetter from "../home/components/htmlSetter.tsx";
import { useTestDescriptionStore } from "@/stores/testStore.ts";
import type { TestDetailsData } from "@/api/model/test-model.ts";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

function TestDescription() {
  const { testData }: StoreDataProps = useTestDescriptionStore();
  // console.log(testData?.name);

  return (
    <div className="max-w-6xl w-full rounded-2xl border shadow-lg p-4 bg-white flex flex-col gap-3 overflow-x-auto">
      <div>
        <Tabs defaultValue="All Tests" className="w-full">
          <TabsList className="flex gap-5">
            <TabsTrigger value="All Tests">All Tests</TabsTrigger>
            <TabsTrigger value="Group by difficulty level">
              Group by difficulty level
            </TabsTrigger>
            <TabsTrigger value="Group by test type">
              Group by test type
            </TabsTrigger>
            <TabsTrigger value="Test description">Test description</TabsTrigger>
          </TabsList>

          {/* All Tests */}
          <TabsContent value="All Tests">
            <Card>
              <CardHeader>
                <CardTitle>Test List</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <AllTests />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Group by difficulty */}
          <TabsContent value="Group by difficulty level">
            <GroupByDifficulty />
          </TabsContent>

          {/* Group by test type */}
          <TabsContent value="Group by test type">
            <GroupByTestType />
          </TabsContent>

          <TabsContent value="Test description">
            <Card>
              <CardContent>
                <HtmlSetter html={testData?.description ?? ""} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* <h1 className="text-gray-700 font-semibold">Description</h1> */}
    </div>
  );
}

export default TestDescription;
