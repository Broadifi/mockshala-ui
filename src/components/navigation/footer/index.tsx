import FooterCopyRight from "./footerCopyRight";
import FooterDetails from "./footerDetails";
import FooterSocialMedia from "./footerSocialMedia";
import JoinOurTeam from "./joinOurTeam";

{
  /* <div className=" w-full container px-4 py-2 mx-auto lg:mt-20"></div> */
}

function FooterCTA() {
  return (
    <div >
      <div className="w-full container px-4 py-2 mx-auto  space-y-5">
        <div className="lg:my-12">
          <JoinOurTeam />
          <FooterDetails />
          <div className="flex lg:hidden">
            <FooterSocialMedia />
          </div>
        </div>
      </div>
      <FooterCopyRight />
    </div>
  );
}

export default FooterCTA;
