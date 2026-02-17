import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { CalendarDays, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  //Fetch the language params
  const { lang } = useParams({ strict: false });

  const currentLang = lang ?? "en";

  const navigate = useNavigate();

  const search = useSearch({ from: "/$lang/current-affairs/" });

  // console.log("search is", search); //{date: '02-02-2026'}
  
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(parseDateFromUrl(search.date));

  function parseDateFromUrl(dateString?: string): Date | undefined {
    if (!dateString) return undefined;
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function setDateToUrl(selectedDate: Date | undefined) {
    navigate({
      to: `/${currentLang}/current-affairs/`,
      search: {
        ...search,
        date: selectedDate
          ? selectedDate
              .toLocaleDateString("en-GB") // DD/MM/YYYY
              .replaceAll("/", "-")
          : undefined,
      },
    });
  }

  function resetDate() {
    setDate(undefined);
    setDateToUrl(undefined);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className=" text-title-gradient-blue font-semibold text-base">
        Select Date
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={` ${date ? "w-[90%]" : "w-full"} justify-between font-normal text-muted-foreground`}
            >
              {date ? date.toLocaleDateString("en-GB") : "Select date"}
              <CalendarDays className="text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          {date && (
            <RotateCcw
              size={18}
              className="text-primary shrink-0"
              onClick={resetDate}
            />
          )}
        </div>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              setDateToUrl(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
