import { MoveRight } from "lucide-react";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

function ViewAllButton({ children }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="flex gap-2 justify-center items-center px-3 sm:px-5 py-2 rounded-lg bg-linear-to-r from-button-blue to-button-sky
                   text-base text-white font-semibold
                   hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                   transition-colors duration-200
                   shadow-sm cursor-pointer"
      >
        <p className="text-sm sm:text-base">{children}</p>
         <MoveRight className='w-4 sm:w-5 ' />
      </button>
    </div>
  );
}

export default ViewAllButton;