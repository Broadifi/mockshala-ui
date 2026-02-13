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

  /* -------------------- HANDLERS -------------------- */

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  /*----------- Handle ChevronUp Button---------------*/

  function handleChevronUp() {
    setIsSearchOpen(false);
    setFilteredFilters(filters);
    setSearchText("");
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="w-[16rem] p-4 mt-10 flex flex-col gap-4 ">
      <h2 className="text-lg font-bold text-title-darkblue tracking-wider mb-2">
        Filters
      </h2>

      <DatePicker />

      {/* -------------------- TAG SEARCH -------------------- */}
      <div className="">
        <div className="flex items-center h-10 overflow-hidden">
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
                </Field>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChevronUp()}
                >
                  <ChevronUp size={24} className="text-title-gradient-blue" />
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
                  <p className="text-title-gradient-blue ">Select Tags</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={22} className="text-title-gradient-blue" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* -------------------- TAG LIST -------------------- */}
        <div className="py-2 ">
          {filteredFilters.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">
              No tags found
            </p>
          ) : (
            <div className="space-y-3 h-[60vh] overflow-y-auto">
              {filteredFilters.map((item) => (
                <div key={item._id} className="flex items-center gap-2 text-sm">
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
    </div>
  );
}
