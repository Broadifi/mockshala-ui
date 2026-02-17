import { mockShalaLogo } from "@/assets";
import FooterPopularTests from "./footerPopularTests";
import FooterExamCategory from "./footerExamcategory";

function FooterDetails() {
  return (
    <div className="grid grid-cols-13 gap-10 py-10">
      <div className="col-span-4">
        <div className="space-y-6 pr-5">
          <img
            src={mockShalaLogo}
            alt="mockShalaLogo"
            className="h-7 xl:h-8 w-auto"
          />

          <p className="text-subtitle-gray">
            MOCKSHALA is committed to instilling a love of learning in every
            individual.our platform, which was founded in 2023 has become a
            cornerstone for test series. we incorporate interactive quizzes,
            test series, current affairs, success story etc.our selected content
            creators and their expertness in respective subject ensuring
            top-notch quality content for you.learn at your own pace, anytime,
            anywhere. Our platform is acccessible 24/7.
          </p>
        </div>
      </div>

      <div className="col-span-3 space-y-6">
        <h3 className="text-title-darkblue font-semibold text-xl">Popular Tests</h3>
        <FooterPopularTests />
      </div>
      <div className="col-span-3 space-y-6">
        <h3 className="text-title-darkblue font-semibold text-xl">Popular Categories</h3>
        <FooterExamCategory />
      </div>
      <div className="col-span-3 bg-amber-100">04</div>
    </div>
  );
}

export default FooterDetails;
