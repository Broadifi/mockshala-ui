
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
      {labelHidden && <Label className='px-1 mb-2 text-title-gradient-blue'>Select Language</Label>}
      <Select 
      defaultValue={currentLang} onValueChange={setLanguage}
      >
        <SelectTrigger className='w-full relative border-gray-400'>
          <SelectValue placeholder='Select a language' />
          <Languages className='absolute hidden lg:block right-8' />
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
