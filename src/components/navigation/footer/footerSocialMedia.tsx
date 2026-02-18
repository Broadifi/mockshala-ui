import { queryKeys } from "@/api";
import { siteConfigAPI } from "@/api/services/siteConfigData";
import { QUERY_CONFIG } from "@/api/config";
import { useQuery } from "@tanstack/react-query";
import { facebook, instagram } from "@/assets";

function FooterSocialMedia() {
  const { data } = useQuery({
    queryKey: queryKeys.siteConfigsKeys.siteConfigsDetails(),
    queryFn: siteConfigAPI.siteConfigData,
    ...QUERY_CONFIG.static,
  });

  const facebookLInk = data?.data.facebook
  const instagramLink = data?.data.instagram

  return (
    <div>
      <h1 className="text-lg font-semibold text-title-darkblue">Follow Us</h1>
      <p className="text-muted-foreground">
        Stay connected with us on social media
      </p>

      {/* Share Buttons */}
      <div className="flex gap-6 mt-3 mb-6">
        <div>
          <a
            href={facebookLInk}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="facebookLogo"
              className="h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </a>
        </div>

        <div>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="instagramLogo"
              className="h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterSocialMedia;
