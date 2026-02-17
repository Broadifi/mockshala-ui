import { Mail, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

function FooterContactDetails() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <MapPin size={20} className="text-title-gradient-blue" />
        </div>
        <p className="text-subtitle-gray text-sm ">
          4th Floor Pukhraj Corporate Navlakha Square Indore 452001
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <Mail size={20} className="text-title-gradient-blue" />
        </div>
        <p className="text-subtitle-gray text-sm cursor-pointer hover:text-button-blue">
          <a href="mailto:contact@mockshala.com">contact@mockshala.com</a>
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-sky-100 rounded-full p-2">
          <Phone size={20} className="text-title-gradient-blue" />
        </div>

        <div className="text-subtitle-gray text-sm">
          <p className=" cursor-pointer hover:text-button-blue">
            <a href="tel:91 09544599">+91 9109544599</a>
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
            <a href="https://wa.me/919109544599">+91 9109544599</a>
          </p>
          <p className="text-muted-foreground">(Whatsapp Text Only)</p>
        </div>
      </div>
    </div>
  );
}

export default FooterContactDetails;
