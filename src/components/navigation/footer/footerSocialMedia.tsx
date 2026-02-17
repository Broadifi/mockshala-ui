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

function FooterSocialMedia() {
  const shareUrl = window.location.href;
  const title = "mockshalaeducation";

  return (
    <div>
      <h1 className="text-lg font-semibold text-title-darkblue">
        Follow Us
      </h1>
      <p className="text-muted-foreground">
        Stay connected with us on social media
      </p>

      {/* Share Buttons */}
      <div className="flex gap-6 mt-3 mb-6">
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
}

export default FooterSocialMedia;
