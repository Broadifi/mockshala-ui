import { Bookmark, Share } from "@/assets";

function CurrentAffairsActions() {
  return (
    <div className="flex  gap-6 md:gap-4">
      {/* Share */}
      <div className="flex gap-2 items-center">
        <button className="cursor-pointer">
          <img src={Share} alt="questions" className="h-5 md:h-6 shadow-2xl" />
        </button>
      </div>

      {/* Save */}
      <div className="flex gap-2 items-center">
        <button className="cursor-pointer">
          <img
            src={Bookmark}
            alt="questions"
            className="h-5 md:h-6 shadow-2xl"
          />
        </button>
      </div>
    </div>
  );
}

export default CurrentAffairsActions;
