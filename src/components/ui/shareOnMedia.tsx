import { Share2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
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

import { toast } from "sonner";

interface PopUpData {
  title: string;
  buttonName: string;
  popupHeader: string;
}

interface PopUpProps {
  data: PopUpData;
}

function ShareOnMedia({ data }: PopUpProps) {
  const [open, setOpen] = useState(false);

  const shareUrl = window.location.href;
  const title = data.title;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
    setOpen(false);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-6 md:gap-4">
        {/* Share */}
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <div className="flex gap-2 text-sm items-center hover:cursor-pointer">
            <Share2 size={18} className="text-gray-600" />
            <p className="text-[#1e4064] ">{data.buttonName}</p>
          </div>
        </button>
      </div>

      {/* Share Popup - Rendered as Portal to avoid parent overflow constraints */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in fade-in zoom-in-95">
              <h3 className="text-lg font-semibold mb-5 text-center">
                {data.popupHeader}
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
          </div>,
          document.body,
        )}
    </>
  );
}

export default ShareOnMedia;
