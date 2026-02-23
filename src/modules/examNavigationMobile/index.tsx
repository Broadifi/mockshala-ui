import { queryKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { IMAGE_BASE_URL } from "@/api/url";
import React from "react";
import FilterExamsMobile from "./filterExamsMobile";

interface NavigationProps {
  onBack: () => void;
  onClose: () => void;
}

export function ExamNavigation({ onBack, onClose }: NavigationProps) {
  const { data } = useQuery({
    queryKey: queryKeys.home.paidTestCategories(),
    queryFn: homeAPI.getDashboardPaidCategories,
    ...QUERY_CONFIG.static,
  });

  const categories = data?.data?.featureCategories ?? [];

  const [openItem, setOpenItem] = React.useState<string>("");

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={onBack} aria-label="Go back to main menu">
          <ChevronLeft size={20} className="text-text-title-darkblue" />
        </button>
        <h3 className="font-semibold text-title-darkblue">Exams</h3>
      </div>

      {/* CATEGORY LIST */}
      <div className="flex-1 overflow-y-auto p-4">
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="w-full"
        >
          {categories.map((cat) => (
            <AccordionItem key={cat._id} value={cat.slug}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 text-left">
                  <ImageWithFallback
                    src={IMAGE_BASE_URL + cat.image}
                    alt={cat.categoryName || "Test series image"}
                    className="w-8 h-8 rounded"
                  />
                  <p className="text-title-darkblue font-medium">
                    {cat.categoryName}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <FilterExamsMobile slug={openItem} onTestClick={onClose} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
