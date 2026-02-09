interface ButtonProps {
  title: string;
}
function BuyNow({ title }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="flex w-20 items-center gap-2 rounded-lg border-2 border-orange-500
        hover:border-blue-700
        text-orange-500 
        hover:text-blue-700
        transition-colors duration-200 px-2 py-1 hover:cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
}

export default BuyNow;
