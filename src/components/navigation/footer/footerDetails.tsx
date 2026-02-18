import { mockShalaLogo } from "@/assets";
import FooterPopularTests from "./footerPopularTests";
import FooterExamCategory from "./footerExamcategory";
import FooterContactDetails from "./footerContactDetails";
import FooterSocialMedia from "./footerSocialMedia";

function FooterDetails() {
  return (
    <div className="w-full bg-white">
      {/* CONTAINER */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 mt-10">
          
          {/* ================= ABOUT SECTION ================= */}
          <div className="lg:max-w-lg w-full lg:col-span-4 xl:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-10 ">
            
            {/* Logo + Description */}
            <div className="space-y-6">
              <img
                src={mockShalaLogo}
                alt="mockShalaLogo"
                className="h-7 xl:h-8"
              />

              <p className="text-subtitle-gray leading-relaxed text-sm md:text-base">
                MOCKSHALA is committed to instilling a love of learning in every
                individual. Our platform, which was founded in 2023, has become
                a cornerstone for test series. We incorporate interactive quizzes,
                test series, current affairs, success stories, etc. Our selected
                content creators and their expertise in respective subjects ensure
                top-notch quality content for you. Learn at your own pace, anytime,
                anywhere. Our platform is accessible 24/7.
              </p>
            </div>

            {/* Social icons */}
            <div className="hidden lg:flex">
              <FooterSocialMedia />
            </div>
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="w-full lg:col-span-8 xl:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              
              {/* Popular Tests */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-title-gradient-blue font-semibold text-xl">
                  Popular Tests
                </h3>
                <FooterPopularTests />
              </div>

              {/* Categories */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-title-gradient-blue font-semibold text-xl">
                  Popular Categories
                </h3>
                <FooterExamCategory />
              </div>

              {/* Contact */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-title-gradient-blue font-semibold text-xl">
                  Contact Us
                </h3>
                <FooterContactDetails />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FooterDetails;