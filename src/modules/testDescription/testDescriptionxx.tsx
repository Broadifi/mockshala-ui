import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTests from "./allTests/allTests.tsx";
import GroupByDifficulty from "./dificultyLevels.tsx/index.tsx";
import GroupByTestType from "./testTypes/index.tsx";
import HtmlSetter from "../home/components/htmlSetter.tsx";
import { useTestDescriptionStore } from "@/stores/testStore.ts";

function TestDescriptionxx() {
  const { testData } = useTestDescriptionStore();

  return (
    <div className="max-w-6xl w-full flex-col gap-3 bg-soft-blue-gradient ">
      <div>
        <Tabs defaultValue="All Tests" className="w-full">
          {/* Scrollable wrapper for TabsList */}
          <div className="relative -mx-4 px-4  overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:mx-0 lg:px-0 py-1 mt-6 ">
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
              <CardHeader className="px-0">
                <CardTitle className="text-card-header-darkblue ">{`Available Tests(${testData?.tests.length})`}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm px-0 py-0">
                <AllTests />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Group by difficulty */}
          <TabsContent value="Group by difficulty level">
            <Card className="border-0  shadow-none bg-soft-blue-gradient py-4 md:py-6">
              <CardHeader className="px-0">
                <CardTitle className="text-card-header-darkblue ">Choose Difficulty Level</CardTitle>
              </CardHeader>
              <CardContent className=" px-0">
                <GroupByDifficulty />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Group by test type */}
          <TabsContent value="Group by test type">
            
            <Card className="border-0  shadow-none bg-soft-blue-gradient py-4 md:py-6">
              <CardHeader className="px-0 ">
                <CardTitle className="text-card-header-darkblue ">Choose Test Types</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm overflow-x-auto px-0">
                <GroupByTestType />
              </CardContent>
            </Card>
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
    </div>
  );
}

export default TestDescriptionxx;
