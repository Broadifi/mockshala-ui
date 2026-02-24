import { Tag, Search, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Route } from "@/routes/$lang/current-affairs";

import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DatePicker } from "@/modules/current-affairs/components/datePicker";

import type { CurrentAffairsAllFlagsData } from "@/api/model/current-affairs";

import { AnimatePresence, motion } from "framer-motion";

interface FilterProps {
  filters: CurrentAffairsAllFlagsData[];
}

export default function FilterCurrentAffairMobile({ filters }: FilterProps) {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

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

    setFilteredFilters(
      filters.filter((item) => item.name.toLowerCase().includes(query)),
    );
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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  function handleChevronUp() {
    setIsSearchOpen(false);
    setFilteredFilters(filters);
    setSearchText("");
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="w-[16rem] px-4 py-6 flex flex-col h-dvh">

      <h2 className="text-lg font-bold text-title-darkblue tracking-wider mb-4">
        Filters
      </h2>

      <DatePicker />

      {/* -------------------- TAG SECTION -------------------- */}
      <div className="mt-4 flex flex-col flex-1 min-h-0">

        {/* Search Header */}
        <div className="flex items-center h-10 shrink-0 overflow-hidden">
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
                <Field orientation="horizontal" className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search Tag..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    autoFocus
                    className=" focus-visible:ring-1 focus-visible:ring-blue-200"
                  />
                </Field>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChevronUp}
                >
                  <ChevronUp size={22} className="text-title-gradient-blue" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="label"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex justify-between items-center w-full"
              >
                <div className="font-semibold flex gap-1 items-center">
                  <Tag size={15} />
                  <p className="text-title-gradient-blue">Select Tags</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} className="text-title-gradient-blue" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable Tag List */}
        <div className="mt-3 flex-1 overflow-y-auto min-h-0 pr-1">
          {filteredFilters.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">
              No tags found
            </p>
          ) : (
            <div className="space-y-3 pb-6">
              {filteredFilters.map((item) => (
                <div key={item._id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    id={item._id}
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
    </div>
  );
}
