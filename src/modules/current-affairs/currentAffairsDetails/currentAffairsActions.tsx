import { useState } from "react";
import {
  WhatsappShareButton,
  TwitterShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import { Bookmark, Share } from "@/assets";
import { toast } from "sonner";

function CurrentAffairsActions() {
  const [open, setOpen] = useState(false);

  const shareUrl = window.location.href;
  const title = "Check this current affair 👇";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
      setOpen(false);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-6 md:gap-4">
        {/* Share */}
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <img src={Share} alt="share" className="h-5 md:h-6" />
        </button>

        {/* Bookmark */}
        <button className="cursor-pointer">
          <img src={Bookmark} alt="bookmark" className="h-5 md:h-6" />
        </button>
      </div>

      {/* Share Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-semibold mb-5 text-center">
              Share this article
            </h3>

            {/* Share Buttons */}
            <div className="flex justify-center gap-6 mb-6">
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>

              <FacebookShareButton url={shareUrl} title={title}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={48} round />
              </LinkedinShareButton>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyLink}
              className="w-full p-3 rounded-lg border hover:bg-gray-100 transition font-medium"
            >
              🔗 Copy Link
            </button>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full bg-gray-100 hover:bg-gray-200 rounded-lg py-2 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentAffairsActions;
