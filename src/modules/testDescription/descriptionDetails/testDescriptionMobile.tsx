import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTests from "../allTests/allTests.tsx";
import GroupByDifficulty from "../difficultyLevels/index.tsx";
import GroupByTestType from "../testTypes/index.tsx";
import HtmlSetter from "../../../components/htmlSetter.tsx";
import { useTestDescriptionStore } from "@/stores/testStore.ts";
import { useParams } from "@tanstack/react-router";
import { queryClient } from "@/main";
import { testDescriptionKey } from "@/api";
import type { TestDetailsResponse } from "@/api/model/test-model";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Search } from "lucide-react";

function TestDescriptionMobile() {
  const { tests, filterTests, resetTests, originalTests } =
    useTestDescriptionStore();

  const [searchText, setSearchText] = useState("");

  const { examCategory, testSlug } = useParams({
    from: "/$lang/exams/$examCategory/$testSlug/",
  });

  // Get the description from query data
  const queryData = queryClient.getQueryData(
    testDescriptionKey.testDetails(examCategory, testSlug),
  ) as TestDetailsResponse | undefined;

  // Filter search query in locally

  useEffect(() => {
    const query = searchText.trim().toLowerCase();

    if (query === "") {
      resetTests();
    } else {
      // filterTests((item) => item.name.toLowerCase().includes(query));

      const matched = originalTests.filter((item) =>
        item.name.toLowerCase().includes(query),
      );
      filterTests(matched);
    }
  }, [searchText, filterTests, resetTests, originalTests]);

  const allTestLength = () => {
    return tests.length ?? 0;
  };

  return (
    <div className="w-full bg-soft-blue-gradient ">
      <div className="flex justify-center md:justify-end pt-4">
        <div className="relative w-full md:max-w-md">
          <Input
            type="search"
            placeholder="Search Test..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" w-full
        pr-10
        rounded-xl
        border border-gray-200
        bg-white
        shadow-sm
        placeholder:text-gray-400
        focus-visible:ring-2
        focus-visible:ring-blue-200
        focus-visible:border-blue-300
        transition-all duration-200
      "
          />

          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div>
        <Tabs defaultValue="All Tests" className="w-full">
          {/* Scrollable wrapper for TabsList */}
          <div className="overflow-x-auto scrollbar-hide lg:overflow-x-visible lg:mx-0 lg:px-0 py-2 mt-5 ">
            <TabsList className="bg-soft-blue-gradient inline-flex w-auto min-w-full lg:min-w-0 lg:w-auto gap-2 ">
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
                <h3 className="text-title-darkblue font-semibold tracking-wide">{`Available Tests(${allTestLength()})`}</h3>
              </div>
              <AllTests />
            </Card>
          </TabsContent>

          {/* Group by difficulty */}
          <TabsContent value="Group by difficulty level">
            <div className=" bg-soft-blue-gradient py-4 md:py-6">
              <div>
                <h3 className="text-title-darkblue font-semibold tracking-wide mb-3">
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
                <h3 className="text-title-darkblue font-semibold tracking-wide mb-3">
                  Choose Test Types
                </h3>
              </div>
              <GroupByTestType />
            </div>
          </TabsContent>

          <TabsContent value="Test description">
            <Card className="mt-3">
              <CardContent>
                <HtmlSetter html={queryData?.data?.description ?? ""} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TestDescriptionMobile;
