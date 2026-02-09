import { useSearch, useNavigate } from '@tanstack/react-router';
import { Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { DatePicker } from '@/modules/current-affairs/components/datePicker';
import { LanguageSelector } from '@/modules/current-affairs/components/languageSelector';
import type { CurrentAffairsAllFlagsData} from '@/api/model/current-affairs';


interface FilterProps{
  filters: CurrentAffairsAllFlagsData[]
}

export default function FilterCurrentAffairs({filters}:FilterProps) {

  // console.log("filterrr",filters);

  const navigate = useNavigate({ from: '/$lang/current-affairs' });

  const search = useSearch({ from: '/$lang/current-affairs/' });
  const [selectedTags, setSelectedTags] = useState<string[]>(search.tags || []);

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
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Card className='w-[16rem] p-4 flex-col gap-4 sticky top-22 h-fit hidden lg:flex'>
      <h2 className='text-lg font-bold text-title-darkblue tracking-wider'>Filters</h2>
      <DatePicker />
      <LanguageSelector labelHidden={true} />
      <div>
        <div className='font-semibold text-zinc-800 flex gap-1 items-center'>
          <Tag size={15} className='font-semibold' />
          <p>Select Tags</p>
        </div>
        {/* All tags */}
        <div className='space-y-2 mt-2  overflow-y-auto'>
          {filters.map(item => (
            <div key={item._id} className='flex items-center gap-3'>
              <Checkbox
                id={item._id}
                className='border-gray-800 rounded-full'
                checked={selectedTags.includes(item.name)}
                onCheckedChange={() => {
                  toggleTag(item.name);
                }}
              />
              <label
                htmlFor={item._id}
                className='text-sm tracking-wider uppercase'
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
