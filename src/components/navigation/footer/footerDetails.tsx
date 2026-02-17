import { mockShalaLogo } from "@/assets";
import FooterPopularTests from "./footerPopularTests";
import FooterExamCategory from "./footerExamcategory";
import FooterContactDetails from "./footerContactDetails";
import FooterSocialMedia from "./footerSocialMedia";

function FooterDetails() {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-12 gap-8 xl:gap-10 py-10">
      {/* ABOUT */}
      <div className="lg:col-span-4">
        <div className="space-y-6 lg:space-y-10">
          <div className="space-y-6 pr-5">
            <img
              src={mockShalaLogo}
              alt="mockShalaLogo"
              className="h-7 xl:h-8 w-auto"
            />

            <p className="text-subtitle-gray leading-relaxed">
              MOCKSHALA is committed to instilling a love of learning in every
              individual.our platform, which was founded in 2023 has become a
              cornerstone for test series. we incorporate interactive quizzes,
              test series, current affairs, success story etc.our selected
              content creators and their expertness in respective subject
              ensuring top-notch quality content for you.learn at your own pace,
              anytime, anywhere. Our platform is acccessible 24/7.
            </p>
          </div>

          <div className="hidden lg:flex">
            <FooterSocialMedia />
          </div>
        </div>
      </div>

      {/* POPULAR TESTS */}
      <div className="lg:col-span-3 space-y-4 lg:space-y-6">
        <h3 className="text-title-gradient-blue font-semibold text-xl">
          Popular Tests
        </h3>
        <FooterPopularTests />
      </div>

      {/* CATEGORIES */}
      <div className="lg:col-span-3 space-y-4 lg:space-y-6">
        <h3 className="text-title-gradient-blue font-semibold text-xl">
          Popular Categories
        </h3>
        <FooterExamCategory />
      </div>

      {/* CONTACT */}
      <div className="lg:col-span-2 space-y-4 lg:space-y-6">
        <h3 className="text-title-gradient-blue font-semibold text-xl">
          Contact Us
        </h3>
        <FooterContactDetails />
      </div>
    </div>
  );
}

export default FooterDetails;
