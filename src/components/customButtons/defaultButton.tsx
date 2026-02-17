import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

function DefaultButton({ children }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="px-6 py-1 rounded-lg bg-linear-to-r from-button-blue to-button-sky
                   text-base text-white font-semibold
                   hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                   transition-colors duration-200
                   shadow-sm cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
}

export default DefaultButton;