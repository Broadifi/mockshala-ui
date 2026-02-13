import { Play } from "lucide-react";

interface ButtonProps {
  title: string;
}
function StartButton({ title }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="flex w-25 justify-center
         items-center gap-2 rounded-lg bg-linear-to-r from-button-sky
         to-button-blue 
        hover:bg-blue-700 hover:shadow-md
        text-white 
        transition-colors duration-200 px-4 py-2 hover:cursor-pointer"
      >
        <Play size={15} />
        {title}
      </button>
    </div>
  );
}

export default StartButton;
