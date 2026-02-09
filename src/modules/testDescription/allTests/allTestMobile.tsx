import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useTestDescriptionStore } from "@/stores/testStore";
import {
  Clock,
  BookOpen,
  Award,
  Lock,
  LockKeyholeOpen,
  Play,
} from "lucide-react";

import { formatName } from "@/utils/formatting/formatName";
import { formattingWord } from "@/utils/formatting/formattingWord";
import type { TestDetailsData } from "@/api/model/test-model";

interface FilterDataProps {
  filteredTests: TestDetailsData["tests"] | undefined ;
}

function AllTestMobile({ filteredTests }: FilterDataProps) {
  // const { testData } = useTestDescriptionStore();

  const difficultyColors: Record<string, string> = {
    beginner: "text-green-600 bg-green-50",
    intermediate: "text-orange-500 bg-orange-50",
    pro: "text-red-600 bg-red-50",
  };

  const formatDuration = (minutes: number): string => {
    if (!minutes || minutes <= 0) return "0 min";

    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMinutes} min`;
  };

  // const filteredTests = testData?.tests ?? []

  return (
    <div className="max-w-6xl w-full">
      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTests?.map((test) => (
          <Card
            key={test._id}
            className="overflow-hidden "
          >
            <CardContent className="px-4">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  className={`${
                    difficultyColors[test.difficultyLevel.toLowerCase()] ??
                    "text-gray-600 bg-gray-50"
                  } uppercase`}
                  variant="secondary"
                >
                  {test.difficultyLevel}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-button-sky uppercase"
                >
                  {formattingWord(test.testType)}
                </Badge>
              </div>

              {/* Test Name */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900 leading-tight">
                  {formatName(test.name)}
                </h3>
                {test.isOpen ? (
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <LockKeyholeOpen
                      className="text-green-600 shrink-0"
                      size={18}
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Lock className="text-gray-400 shrink-0" size={18} />
                  </div>
                )}
              </div>

              {/* Test Stats */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} className="text-gray-400" />
                  <span>{test.totalQuestions} Qs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-gray-400" />
                  <span>{formatDuration(test.time)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={16} className="text-gray-400" />
                  <span>{test.highestScore} Marks</span>
                </div>
              </div>

              {/* Action Button */}
              {test.isOpen ? (
                <Button className="w-full bg-linear-to-r from-button-sky to-button-blue  text-white font-semibold rounded-lg h-10">
                  <Play size={18} className="mr-1" />
                  Start Test
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full  border-button-blue text-button-blue hover:bg-blue-50 font-semibold rounded-lg h-10"
                >
                  Unlock Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No tests message */}
      {filteredTests?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tests available</p>
        </div>
      )}
    </div>
  );
}

export default AllTestMobile;
