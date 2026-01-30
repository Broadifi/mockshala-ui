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
import { Badge } from "@/components/ui/badge";
import StartButton from "@/components/customButtoms/startButtom";
import BuyNow from "@/components/customButtoms/buyNow";
import { formatName } from "@/utils/formatting/formatName";
import { formattingWord } from "@/utils/formatting/formattingWord";

interface FilterDataProps {
  filterData: TestDetailsData["tests"] | undefined;
}

export function DifficultyTable({ filterData }: FilterDataProps) {
  console.log("filter is", filterData);

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
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Difficulty</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="pl-2">Test Name</TableHead>
            <TableHead className="text-center">Questions</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Max Score</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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

              <TableCell className=" flex justify-center items-center">
                <Badge variant={"secondary"}>
                  {formattingWord(item.examType)}
                </Badge>
              </TableCell>

              <TableCell className="pl-2 font-medium ">
                <div className="max-w-xs w-full truncate text-table-text-primary">
                  <p title={formatName(item.name)}>{formatName(item.name)}</p>
                </div>
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
