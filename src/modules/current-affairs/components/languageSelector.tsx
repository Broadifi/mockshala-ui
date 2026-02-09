
import { Languages } from 'lucide-react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNewsLanguage } from '@/stores/testStore';

interface LanguageSelectorProps {
  labelHidden?: boolean;
}

export function LanguageSelector({
  labelHidden = false,
}: LanguageSelectorProps) {


  
  // const [language, setLanguage] = useAtom(languageAtom);

  const {currentLang, setLanguage} = useNewsLanguage()

  return (
    <div>
      {labelHidden && <Label className='px-1 mb-2  text-title-darkblue'>Select Language</Label>}
      <Select 
      defaultValue={currentLang} onValueChange={setLanguage}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a language' />
          <Languages className='text-primary ml-2' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value='hi'>Hindi</SelectItem>
            <SelectItem value='en'>English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
