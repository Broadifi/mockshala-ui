import { useState } from 'react';

import { ExamLanguageSelector } from './examInsLangSelector';

function InstructionFooter() {
  const [checked, setChecked] = useState(false);

  return (
    <div className='w-full mx-auto space-y-5 text-xs sm:text-sm xl:text-base'>
      <div className='flex items-center gap-4 justify-end'>
        <h4 className='text-blue-900'>Choose your language</h4>

        <ExamLanguageSelector/>
      </div>

      <div className='flex gap-4 justify-center items-center'>
        <input
          type='checkbox'
          id='instructions'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          className='min-w-4 min-h-4 accent-blue-500 cursor-pointer border hover:border-blue-500'
        />

        <label htmlFor='instructions '>
          I have read all the instructions carefully and abide by them
        </label>
      </div>

      <div className='flex justify-center items-center pb-10 md:pb-6'>
        <div className='flex flex-row gap-4 '>
          <button className=' border rounded-md py-1 px-3 sm:px-5 hover:text-red-600 hover:border-red-600 cursor-pointer text-gray-800'>
            CANCEL
          </button>
          <button
            disabled={!checked}
            className={` ${checked ? 'cursor-pointer bg-linear-to-r from-button-sky to-button-blue text-white' : 'cursor-not-allowed bg-gray-200 text-gray-600'} border rounded-md py-1 px-4`}
          >
            I AM READY TO BEGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionFooter;