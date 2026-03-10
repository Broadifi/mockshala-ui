import { useState } from 'react';

import { ExamLanguageSelector } from './examInsLangSelector';
import { useExamLanguage } from '@/stores/examLanguageStore';
import i18n from '@/i18n';

function InstructionFooter() {
  const [checked, setChecked] = useState(false);

    const { examCurrentLang } = useExamLanguage();

  const getLocalTranslation = (key: string): string => {
    const bundle = i18n.getResourceBundle(
      examCurrentLang,
      "translation",
    ) as Record<string, unknown>;

    return (
      (key.split(".").reduce<unknown>((acc, k) => {
        if (typeof acc === "object" && acc !== null && k in acc) {
          return (acc as Record<string, unknown>)[k];
        }
        return undefined;
      }, bundle) as string) || key
    );
  };

  const handleSubmit = ()=>{
    console.log("sjndfs");
    
  }


  return (
    <div className='w-full mx-auto space-y-4 text-xs sm:text-sm xl:text-base'>
      <div className='flex items-center gap-2 md:gap-4 justify-end'>
        <h4 className='text-blue-900'> {getLocalTranslation("examInstructions.chooseLanguage")}</h4>

        <ExamLanguageSelector/>
      </div>

      <div className='flex gap-2 lg:gap-4 justify-center items-center'>
        <input
          type='checkbox'
          id='instructions'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          className='min-w-4 min-h-4 accent-blue-500 cursor-pointer border hover:border-blue-500'
        />

        <label htmlFor='instructions' className='text-gray-600'>
           {getLocalTranslation("examInstructions.confirmInstructions")}
        </label>
      </div>

      <div className='flex justify-center items-center pb-6'>
        <div className='flex flex-row gap-4 '>
          <button 
             onClick={() => window.close()}
            className=' border rounded-md py-1 px-3 sm:px-5 hover:text-red-600 hover:border-red-600 cursor-pointer text-gray-800'>
            {getLocalTranslation("examInstructions.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!checked}
            className={` ${checked ? 'cursor-pointer bg-linear-to-r from-button-sky to-button-blue text-white' : 'cursor-not-allowed bg-gray-200 text-gray-600'} border rounded-md py-1 px-4`}
          >
            {getLocalTranslation("examInstructions.readyToBegin")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionFooter;