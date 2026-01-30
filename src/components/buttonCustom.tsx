import { Button } from "./ui/button";

interface ButtonProps {
  title: string;
}
function ButtonCustom({ title }: ButtonProps) {
  return (
    <div>
      <Button
        className=" w-full bg-gradient-to-r from-button-blue
         to-button-sky 
        hover:from-blue-700 hover:to-blue-700 hover:shadow-md
        text-white 
        transition-colors duration-200"
      >
        {title}
      </Button>
    </div>
  );
}

export default ButtonCustom;
