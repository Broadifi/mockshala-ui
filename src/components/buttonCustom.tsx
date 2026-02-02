import { Button } from "./ui/button";

interface ButtonProps {
  title: string;
}
function ButtonCustom({ title }: ButtonProps) {
  return (
    <div>
      <Button
        className=" w-full bg-gradient-to-r from-button-sky
         to-button-blue 
        hover:from-blue-600 hover:to-blue-600 hover:shadow-md
        text-white font-semibold
        transition-colors duration-200 hover:cursor-pointer"
      >
        {title}
      </Button>
    </div>
  );
}

export default ButtonCustom;
