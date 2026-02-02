import React from "react";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TestDetailsData } from "@/api/model/test-model";
import StartButton from "@/components/customButtoms/startButtom";
import BuyNow from "@/components/customButtoms/buyNow";
import { formatName } from "@/utils/formatting/formatName";
import { formattingWord } from "@/utils/formatting/formattingWord";

interface FilterDataProps {
  filterData: TestDetailsData["tests"] | undefined;
}

export function TestTypeTable({ filterData }: FilterDataProps) {
  // console.log("filter is", filterData);

  //  console.log(testData?.name);
  //Convert the time

  const formatDuration = (minutes: number): string => {
    if (!minutes || minutes <= 0) return "0 min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;

    return `${hours} hr ${remainingMinutes} min`;
  };

  const difficultyTextColor: Record<string, string> = {
    beginner: "text-green-600",
    intermediate: "text-orange-500",
    pro: "text-red-600",
  };

  return (
    <div className="w-full h-[70vh] overflow-y-auto flex flex-col">
      <Table className="w-full border-collapse ">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="sticky top-0 z-50 bg-white">
          <TableRow>
            <TableHead>Difficulty</TableHead>
            {/* <TableHead className="text-center">Test Type</TableHead> */}
            <TableHead className="pl-2">Test Name</TableHead>
            <TableHead className="text-center">Questions</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Max Score</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="hide-scrollbar">
          {filterData?.map((item) => (
            <TableRow key={item._id}>
              <TableCell
                className={
                  difficultyTextColor[item.difficultyLevel.toLowerCase()] ??
                  "text-gray-600"
                }
              >
                {formattingWord(item.difficultyLevel)}
              </TableCell>

              {/* <TableCell className=" flex justify-center items-center">
                <Badge variant={"secondary"}>
                  {formattingWord(item.testType)}
                </Badge>
              </TableCell> */}

              <TableCell className="font-medium max-w-xs ">
                <p
                  title={formatName(item.name)}
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

              <TableCell className="text-center">{item.highestScore}</TableCell>

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
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
