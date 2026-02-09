import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TestDetailsData } from "@/api/model/test-model";
import { Badge } from "@/components/ui/badge";
import StartButton from "@/components/customButtons/startButtom";
import BuyNow from "@/components/customButtons/buyNow";
import { formatName } from "@/utils/formatting/formatName";
import { formattingWord } from "@/utils/formatting/formattingWord";
import { useTestDescriptionStore } from "@/stores/testStore";
import { AllTestsTableSkeleton } from "../skeleton/allTestsTableSkeleton";

import { useParams } from "@tanstack/react-router";
import { queryClient } from "@/main";
import { testDescriptionKey } from "@/api";
import AllTestMobile from "./allTestMobile";
import MobileAllTestCardSkeleton from "../skeleton/mobileAllTestCardSkeleton";

interface StoreDataProps {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}
function AllTests() {
  const { testData }: StoreDataProps = useTestDescriptionStore();

  const { examCategory, testSlug } = useParams({
    from: "/$lang/exams/$examCategory/$testSlug/",
  });

  //Fetch the loading state to show the table Skeleton
  const state = queryClient.getQueryState(
    testDescriptionKey.testDetails(examCategory, testSlug),
  );

  // console.log("isFetching", state);

  // console.log("data is", testData?.tests.length);

  const difficultyTextColor: Record<string, string> = {
    beginner: "text-green-600",
    intermediate: "text-orange-500",
    pro: "text-red-600",
  };

  //Convert the time

  const formatDuration = (minutes: number): string => {
    if (!minutes || minutes <= 0) return "0 min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;

    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <div>
      {/* For mobile and tablet screen */}
      <div className="flex lg:hidden">
        {state?.status === "pending" ? (
          <MobileAllTestCardSkeleton />
        ) : (
          <AllTestMobile filteredTests={testData?.tests} />
        )}
      </div>

      <div className="w-full flex flex-col">
        {/* Above large screen */}
        <div className="hidden lg:flex h-[70vh] overflow-y-auto flex-col">
          {state?.status === "pending" ? (
            <AllTestsTableSkeleton rows={7} />
          ) : (
            <Table className="w-full border-collapse ">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="sticky top-0 z-50 bg-white">
                <TableRow>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-center">Test Type</TableHead>
                  <TableHead className="pl-2">Test Name</TableHead>
                  <TableHead className="text-center">Questions</TableHead>
                  <TableHead className="text-center">Duration</TableHead>
                  <TableHead className="text-center">Max Score</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testData?.tests.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell
                      className={
                        difficultyTextColor[
                          item.difficultyLevel.toLowerCase()
                        ] ?? "text-gray-600"
                      }
                    >
                      {formattingWord(item.difficultyLevel)}
                    </TableCell>

                    <TableCell className=" flex justify-center items-center">
                      <Badge variant={"secondary"}>
                        {formattingWord(item.testType)}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium max-w-xs">
                      <p
                        title={item.name}
                        className="truncate overflow-hidden whitespace-nowrap text-table-text-primary"
                      >
                        {formatName(item.name)}
                      </p>
                    </TableCell>

                    <TableCell className="text-center">
                      {item.totalQuestions}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDuration(item.time)}
                    </TableCell>

                    <TableCell className="text-center">
                      {item.highestScore}
                    </TableCell>

                    <TableCell>
                      {item.isOpen ? (
                        <StartButton title={"Start"} />
                      ) : (
                        <BuyNow title={"Buy Now"} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTests;
