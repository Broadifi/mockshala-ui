import { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full container px-4 py-10 mx-auto border-b">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-12">
        {/* PAGE TITLE */}
        <div className="space-y-4">
          <div className="inline-block group">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Privacy Policy
            </h1>

            <div className="mt-2 h-1 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full w-full"></div>
          </div>
        </div>

        {/* DISCLOSURE */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h2 className="text-xl md:text-2xl  font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Disclosure of Your Information
            </h2>

            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <div className="space-y-3">
            <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
              We don't share, trade, or otherwise communicate your personally
              identifiable data to other parties. Your information, including
              test outcomes, will not be shared with any third party.
            </p>

            <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
              If you are on the topper's list (or a comparable ranking) in a
              specific group, some of your performance data analysis may be
              showed privately to other registered users of the site.
            </p>

            <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
              We might share your information if we believe it is essential to
              comply with the law, enforce our site policies, or protect our or
              others' rights, property, or safety.
            </p>
          </div>
        </div>

        {/* INFORMATION WE COLLECT */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Information We Collect
            </h2>

            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
            <strong>Personal Identification Data:</strong> This includes names,
            email addresses, phone numbers, and other similar information.
          </p>
        </div>

        {/* HOW WE USE INFO */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              How We Use Your Information
            </h2>

            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <ul className="text-sm md:text-base text-subtitle-gray leading-relaxed space-y-2 list-disc list-inside text-left max-w-xl mx-auto">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send related information.</li>
            <li>Respond to your comments, questions, and requests.</li>
            <li>Send promotional messages and other information.</li>
          </ul>

          <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
            Mockshala only shares your personal data to third parties in limited
            cases when Mockshala believes such sharing is essential for
            providing the Service, legally required, or permissible by you.
          </p>
        </div>

        {/* POLICY UPDATES */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Updates to Our Privacy Policy
            </h2>

            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-subtitle-gray leading-relaxed">
            Our Privacy Policy is always available on the Website's "Privacy
            Policy" page.
          </p>

          <p className="text-sm md:text-base text-subtitle-gray leading-relaxed">
            We have the right to amend our Privacy Policy to make sure that it
            meets with all applicable rules and regulations. As a result, you
            are encouraged to review our Privacy Policy frequently to stay up to
            date on the most recent changes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
