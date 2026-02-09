import { useSearch, useNavigate } from "@tanstack/react-router";
import { Search, Tag } from "lucide-react";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { DatePicker } from "@/modules/current-affairs/components/datePicker";
import { LanguageSelector } from "@/modules/current-affairs/components/languageSelector";
import type { CurrentAffairsAllFlagsData } from "@/api/model/current-affairs";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FilterProps {
  filters: CurrentAffairsAllFlagsData[];
}

export default function FilterCurrentAffairs({ filters }: FilterProps) {
  const navigate = useNavigate({ from: "/$lang/current-affairs" });
  const search = useSearch({ from: "/$lang/current-affairs/" });

  // Selected (checked) tags
  const [selectedTags, setSelectedTags] = useState<string[]>(search.tags || []);

  // Search input
  const [searchText, setSearchText] = useState("");

  // Visible tags after search
  const [filteredFilters, setFilteredFilters] =
    useState<CurrentAffairsAllFlagsData[]>(filters);

  //Visible
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /* -------------------- SEARCH LOGIC -------------------- */

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();

    console.log(query);

    if (!query) {
      setFilteredFilters(filters);
      return;
    }

    const matched = filters.filter((item) =>
      item.name.toLowerCase().includes(query),
    );

    setFilteredFilters(matched);
  };

  // Reset tag list when input is cleared
  useEffect(() => {
    if (!searchText) {
      setFilteredFilters(filters);
    }
  }, [searchText, filters]);

  // Sync when API filters change
  useEffect(() => {
    setFilteredFilters(filters);
  }, [filters]);

  /* -------------------- URL SYNC -------------------- */

  useEffect(() => {
    navigate({
      search: {
        ...search,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  useEffect(() => {
    setSelectedTags(search.tags ?? []);
  }, [search.tags]);

  /* -------------------- CHECKBOX HANDLER -------------------- */

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  /* -------------------- UI -------------------- */

  return (
    <Card className="w-[18rem] p-4 flex-col gap-4 sticky top-22 h-fit hidden lg:flex">
      <h2 className="text-lg font-bold text-title-darkblue tracking-wider">
        Filters
      </h2>

      <DatePicker />
      <LanguageSelector labelHidden />

      {/* Tag Search */}
      <div className="mt-2">
        <div className="flex justify-between items-center">
          {isSearchOpen ? (
            <div>
              <Field orientation="horizontal">
                <Input
                  type="search"
                  placeholder="Search Tag..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={() => handleSearch()}
                />
                <button onClick={handleSearch}>
                  <Search size={"25"} className="text-title-gradient-blue" />
                </button>
              </Field>
            </div>
          ) : (
            <div className="flex justify-between  w-full pb-1">

            <div className="font-semibold flex gap-1 items-center">
              <Tag size={15} />
              <p className="text-title-gradient-blue">Select Tags</p>
            </div>

            <div>
              <button onClick={()=>setIsSearchOpen(true)}>
                  <Search size={"25"} className="text-title-gradient-blue" />
                </button>
            </div>
            </div>
          )}

          {/* button */}
          <div></div>
        </div>

        {/* Tag List */}
        <div className="py-2 h-[50vh] overflow-y-auto">
          {filteredFilters.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">
              No tags found
            </p>
          ) : (
            <div className="space-y-3">
              {filteredFilters.map((item) => (
                <div key={item._id} className="flex items-center gap-1 text-sm">
                  <Checkbox
                    id={item._id}
                    className="border-gray-600 rounded-full"
                    checked={selectedTags.includes(item.name)}
                    onCheckedChange={() => toggleTag(item.name)}
                  />
                  <label htmlFor={item._id} className="uppercase text-gray-600">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
