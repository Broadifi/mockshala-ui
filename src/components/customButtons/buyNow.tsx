import { Lock } from "lucide-react";

interface ButtonProps {
  title: string;
}

function BuyNow({ title }: ButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        className="
        relative overflow-hidden
        flex items-center justify-center gap-2
        w-25 px-4 py-2
        rounded-lg
        bg-gray-200
        text-gray-600
        border border-gray-300
        cursor-pointer
        shadow-sm
      "
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="shimmer absolute inset-0"></span>
        </span>

        <Lock size={16} className="opacity-70 relative " />
        <span className="relative font-medium">{title}</span>
      </button>
    </div>
  );
}

export default BuyNow;