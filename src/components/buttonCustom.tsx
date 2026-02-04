import { Button } from "./ui/button";

interface ButtonProps {
  title: string;
}
function ButtonCustom({ title }: ButtonProps) {
  return (
    <Button
      className=" w-full bg-linear-to-r from-button-sky 
         to-button-blue shadow-sm
        hover:from-blue-600 hover:to-blue-600 hover:shadow-md
        text-white font-semibold
        transition-colors duration-200 hover:cursor-pointer"
    >
      {title}
    </Button>
  );
}

export default ButtonCustom;
