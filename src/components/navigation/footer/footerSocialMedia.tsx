import { queryKeys } from "@/api";
import { siteConfigAPI } from "@/api/services/siteConfigData";
import { QUERY_CONFIG } from "@/api/config";
import { useQuery } from "@tanstack/react-query";
import { facebook, instagram } from "@/assets";

/**
 * Normalize URL → ensures it starts with http/https
 */
const normalizeUrl = (url:string |undefined) => {
  if (!url) return null;

  const trimmed = url.trim();

  if (!trimmed) return null;

  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
};

function FooterSocialMedia() {
  const { data } = useQuery({
    queryKey: queryKeys.siteConfigsKeys.siteConfigsDetails(),
    queryFn: siteConfigAPI.siteConfigData,
    ...QUERY_CONFIG.static,
  });

  const facebookLink = normalizeUrl(data?.data?.facebook);
  const instagramLink = normalizeUrl(data?.data?.instagram);

  return (
    <div>
      <h1 className="text-lg font-semibold text-title-darkblue">Follow Us</h1>
      <p className="text-muted-foreground">
        Stay connected with us on social media
      </p>

      {/* Social Icons */}
      <div className="flex gap-6 mt-3 mb-6">
        
        {/* FACEBOOK */}
        {facebookLink ? (
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="facebookLogo"
              className="h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </a>
        ) : (
          <img
            src={facebook}
            alt="facebookLogo"
            className="h-10 opacity-40 cursor-not-allowed"
          />
        )}

        {/* INSTAGRAM */}
        {instagramLink ? (
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
        ) : (
          <img
            src={instagram}
            alt="instagramLogo"
            className="h-10 opacity-40 cursor-not-allowed"
          />
        )}
      </div>
    </div>
  );
}

export default FooterSocialMedia;