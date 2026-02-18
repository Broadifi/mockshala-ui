import { queryKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { siteConfigAPI } from "@/api/services/siteConfigData";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

function FooterContactDetails() {
  const { data } = useQuery({
    queryKey: queryKeys.siteConfigsKeys.siteConfigsDetails(),
    queryFn: siteConfigAPI.siteConfigData,
    ...QUERY_CONFIG.static,
  });

  const contactNo = data?.data.contactNumber;

  const WhatsappNo = data?.data.contactWhatsapp;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <MapPin size={20} className="text-title-gradient-blue" />
        </div>
        <p className="text-subtitle-gray text-sm ">
          {data?.data.contactAddress}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <Mail size={20} className="text-title-gradient-blue" />
        </div>
        <p className=" text-subtitle-gray text-sm cursor-pointer hover:text-button-blue">
          <a href="mailto:contact@mockshala.com"> {data?.data.contactEmail}</a>
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <Phone size={20} className="text-title-gradient-blue" />
        </div>

        <div className="text-subtitle-gray text-sm">
          <p className=" cursor-pointer hover:text-button-blue">
            <a href={`tel:${String(contactNo ?? "").replace(/[^\d+]/g, "")}`}>
              +{contactNo}
            </a>
          </p>
          <p className="text-muted-foreground">(Mon to Fri 9 AM to 6 PM)</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2 flex items-center justify-center">
          <SiWhatsapp size={20} className="text-title-gradient-blue" />
        </div>

        <div className="text-subtitle-gray text-sm">
          <p className="cursor-pointer hover:text-button-blue">
            <a
              href={`https://wa.me/${String(WhatsappNo ?? "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{WhatsappNo}
            </a>
          </p>
          <p className="text-muted-foreground">(Whatsapp Text Only)</p>
        </div>
      </div>
    </div>
  );
}

export default FooterContactDetails;
