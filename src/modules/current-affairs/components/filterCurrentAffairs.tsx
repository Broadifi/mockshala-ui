import { useSearch, useNavigate } from "@tanstack/react-router";
import { ChevronUp, Search, Tag } from "lucide-react";
import { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DatePicker } from "@/modules/current-affairs/components/datePicker";
import { LanguageSelector } from "@/modules/current-affairs/components/languageSelector";

import type { CurrentAffairsAllFlagsData } from "@/api/model/current-affairs";

import { AnimatePresence, motion } from "framer-motion";

interface FilterProps {
  filters: CurrentAffairsAllFlagsData[];
}

export default function FilterCurrentAffairs({ filters }: FilterProps) {
  const navigate = useNavigate({ from: "/$lang/current-affairs" });
  const search = useSearch({ from: "/$lang/current-affairs/" });

  /* -------------------- STATE -------------------- */

  const [selectedTags, setSelectedTags] = useState<string[]>(search.tags || []);
  const [searchText, setSearchText] = useState("");
  const [filteredFilters, setFilteredFilters] =
    useState<CurrentAffairsAllFlagsData[]>(filters);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /* -------------------- LIVE SEARCH -------------------- */

  useEffect(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      setFilteredFilters(filters);
      return;
    }

    const matched = filters.filter((item) =>
      item.name.toLowerCase().includes(query),
    );

    setFilteredFilters(matched);
  }, [searchText, filters]);

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

  /* -------------------- HANDLERS -------------------- */

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  
  /*----------- Handle ChevronUp Button---------------*/

  function handleChevronUp(){
    setIsSearchOpen(false)
     setFilteredFilters(filters);
     setSearchText("")
  }


  /* -------------------- UI -------------------- */

  return (
    <Card className="w-[18rem] p-3 flex-col gap-4 sticky top-22 h-fit hidden lg:flex">
      <h2 className="text-lg font-bold text-title-darkblue tracking-wider">
        Filters
      </h2>

      <DatePicker />
      <LanguageSelector labelHidden />

      {/* -------------------- TAG SEARCH -------------------- */}
      <div className="mt-2">
        <div className="flex items-center h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            {isSearchOpen ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center gap-2 w-full"
              >
                <Field orientation="horizontal">
                  <Input
                    type="search"
                    placeholder="Search Tag..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    autoFocus
                    className="
                      focus:outline-none
                      focus:ring-0
                      focus:ring-offset-0
                      focus-visible:outline-none
                      focus-visible:ring-0
                    "
                  />

                  {/* <Search size={28} className="text-button-blue cursor-pointer" /> */}
                </Field>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                   onClick={() => handleChevronUp()}
                  className="flex"
                >
                  <ChevronUp
                    size={26}
                    className="text-title-gradient-blue cursor-pointer"
                  />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="label"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex justify-between items-center w-full"
              >
                <div className="font-semibold flex gap-1 items-center">
                  <Tag size={15} />
                  <p className="text-title-gradient-blue">Select Tags</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search
                    size={25}
                    className="text-title-gradient-blue cursor-pointer"
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* -------------------- TAG LIST -------------------- */}
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
                  <label
                    htmlFor={item._id}
                    className="uppercase text-gray-600 cursor-pointer"
                  >
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
