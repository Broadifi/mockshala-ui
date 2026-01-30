import { Play } from "lucide-react";

interface ButtonProps {
  title: string;
}
function StartButton({ title }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="flex w-20 justify-center items-center gap-2 rounded-lg bg-button-blue
        hover:bg-blue-700 hover:shadow-md
        text-white 
        transition-colors duration-200 px-3 py-1.5"
      >
         <Play size={15}/>
        {title}
      </button>
    </div>
  );
}

export default StartButton;
