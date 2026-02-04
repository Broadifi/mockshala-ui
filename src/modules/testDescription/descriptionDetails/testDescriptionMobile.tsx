import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTests from "../allTests/allTests.tsx";
import GroupByDifficulty from "../difficultyLevels/index.tsx";
import GroupByTestType from "../testTypes/index.tsx";
import HtmlSetter from "../../../components/htmlSetter.tsx";
import { useTestDescriptionStore } from "@/stores/testStore.ts";

function TestDescriptionMobile() {
  const { testData } = useTestDescriptionStore();

  return (
    <div className="w-full flex-col gap-3 bg-soft-blue-gradient ">
      <div>
        <Tabs defaultValue="All Tests" className="w-full">
          {/* Scrollable wrapper for TabsList */}
          <div className="relative  overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:mx-0 lg:px-0 py-2 mt-5 ">
            <TabsList className="bg-soft-blue-gradient inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-2">
              <TabsTrigger
                value="All Tests"
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600 bg-white data-[state=active]:text-white"
              >
                All Tests
              </TabsTrigger>
              <TabsTrigger
                value="Group by difficulty level"
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600 bg-white data-[state=active]:text-white "
              >
                Group by difficulty level
              </TabsTrigger>
              <TabsTrigger
                value="Group by test type"
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600 bg-white data-[state=active]:text-white"
              >
                Group by test type
              </TabsTrigger>
              <TabsTrigger
                value="Test description"
                className="whitespace-nowrap shrink-0 rounded-full p-4 data-[state=active]:bg-blue-600 bg-white data-[state=active]:text-white"
              >
                Test description
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All Tests */}
          <TabsContent value="All Tests" className="border-0 shadow-none  ">
            <Card className="border-0  shadow-none bg-soft-blue-gradient py-4 md:py-6">
              <div>
                <h3 className="text-card-header-darkblue font-semibold tracking-wide">{`Available Tests(${testData?.tests.length})`}</h3>
              </div>
              <AllTests />
            </Card>
          </TabsContent>

          {/* Group by difficulty */}
          <TabsContent value="Group by difficulty level">
            <div className=" bg-soft-blue-gradient py-4 md:py-6">
              <div>
                <h3 className="text-card-header-darkblue font-semibold tracking-wide mb-3">
                  Choose Difficulty Level
                </h3>
              </div>
              <GroupByDifficulty />
            </div>
          </TabsContent>

          {/* Group by test type */}
          <TabsContent value="Group by test type">
            <div className=" bg-soft-blue-gradient py-4 md:py-6">
              <div>
                <h3 className="text-card-header-darkblue font-semibold tracking-wide mb-3">
                  Choose Test Types
                </h3>
              </div>
              <GroupByTestType />
            </div>
          </TabsContent>

          <TabsContent value="Test description">
            <Card className="mt-3">
              <CardContent>
                <HtmlSetter html={testData?.description ?? ""} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TestDescriptionMobile;
