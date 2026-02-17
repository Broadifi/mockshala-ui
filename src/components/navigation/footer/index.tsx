import FooterDetails from "./footerDetails";
import JoinOurTeam from "./joinOurTeam";

{/* <div className=" w-full container px-4 py-2 mx-auto lg:mt-20"></div> */}

function FooterCTA() {
  return (
    <div className="w-full container px-4 py-2 mx-auto lg:my-15 space-y-12">

        <JoinOurTeam />
        <FooterDetails/>
    </div>
  );
}

export default FooterCTA;