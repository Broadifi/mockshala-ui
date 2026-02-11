
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

import { useParams } from '@tanstack/react-router';
import { useGlobalLanguage } from '@/stores/globalLanguageStore';


interface LanguageSelectorProps {
  labelHidden?: boolean;
}

export function LanguageSelector({
  labelHidden = false,
}: LanguageSelectorProps) {

const { lang } = useParams({ strict: false });
  
  // const [language, setLanguage] = useAtom(languageAtom);

  const {currentLang, setLanguage} = useGlobalLanguage()

  // console.log(currentLang);
  
  return (
    <div>
      {labelHidden && <Label className='px-1 mb-2 text-title-gradient-blue'>Select Language</Label>}
      <Select defaultValue={lang}
        value={currentLang} onValueChange={setLanguage}
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
