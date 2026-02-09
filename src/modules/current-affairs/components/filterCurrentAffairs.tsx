import { useSearch, useNavigate } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { DatePicker } from "@/modules/current-affairs/components/datePicker";
import { LanguageSelector } from "@/modules/current-affairs/components/languageSelector";
import type { CurrentAffairsAllFlagsData } from "@/api/model/current-affairs";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterProps {
  filters: CurrentAffairsAllFlagsData[];
}

export default function FilterCurrentAffairs({ filters }: FilterProps) {
  // console.log("filterrr", filters);

  const navigate = useNavigate({ from: "/$lang/current-affairs" });

  const search = useSearch({ from: "/$lang/current-affairs/" });
  // console.log("serach Tag is", search.tags);

  const [selectedTags, setSelectedTags] = useState<string[]>(search.tags || []);

  //Handel search
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Search text:", searchText);
  };

  useEffect(() => {
    navigate({
      search: {
        ...search,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  // Sync local state with URL search params
  useEffect(() => {
    if (search.tags) {
      setSelectedTags(search.tags);
    } else {
      setSelectedTags([]);
    }
  }, [search.tags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Card className="w-[18rem] p-4 flex-col gap-4 sticky top-22 h-fit hidden lg:flex">
      <h2 className="text-lg font-bold text-title-darkblue tracking-wider">
        Filters
      </h2>
      <DatePicker />
      <LanguageSelector labelHidden={true} />

      {/* Tag section */}

      <div className="mt-2">
        <div className="mb-4">
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search Tag..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Field>
        </div>

        <div className="font-semibold text-zinc-800 flex gap-1 items-center">
          <Tag size={15} className="font-semibold" />
          <p className="text-title-gradient-blue">Select Tags</p>
        </div>

        {/* All tags */}
        <div className="py-2  h-[50vh] overflow-y-auto ">
          <div className="space-y-3">
            {filters.map((item) => (
              <div key={item._id} className="flex items-center gap-1 text-sm">
                <Checkbox
                  id={item._id}
                  className="border-gray-600 rounded-full"
                  checked={selectedTags.includes(item.name)}
                  onCheckedChange={() => {
                    toggleTag(item.name);
                  }}
                />
                <label htmlFor={item._id} className=" uppercase text-gray-600">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
