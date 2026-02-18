import { useEffect } from "react";

function TermsConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full container px-4 py-10 mx-auto border-b">
      <div className=" mx-auto px-4 md:px-6 text-center space-y-10">
        
        {/* PAGE TITLE */}
        <div className="space-y-4">
          <div className="inline-block group">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <div className="mt-2 h-1 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full w-full"></div>
          </div>
        </div>

        {/* ACCEPTANCE */}
        <Section
          title="Acceptance of Terms"
          content={`By using the Mockshala website, you acknowledge and agree to be legally bound by these Terms and Conditions. Mockshala reserves the right to modify, amend, or update these Terms at any time, and continued use of the website constitutes acceptance of such changes.`}
        />

        {/* USE OF CONTENT */}
        <Section
          title="Use of Content"
          content={`All content provided on the Mockshala website is for educational and informational purposes only. You may use this content for personal and non-commercial purposes. You are not allowed to reproduce, distribute, or modify our content without prior written consent.`}
        />

        {/* USER REGISTRATION */}
        <Section
          title="User Registration"
          content={`To access certain features, you may need to register an account. You are responsible for maintaining confidentiality of your account and all activities under it. Accurate information must be provided. Mockshala reserves the right to suspend or terminate accounts at its discretion.`}
        />

        {/* PRIVACY */}
        <Section
          title="Privacy"
          content={`We respect your privacy and handle personal information according to our Privacy Policy.`}
        />

        {/* USER CONDUCT */}
        <div className="space-y-2">
          <Heading title="User Conduct" />

          <ul className="text-xs md:text-sm text-subtitle-gray leading-relaxed space-y-2 list-disc list-inside text-left max-w-xl mx-auto">
            <li>Do not use the website for unlawful purposes.</li>
            <li>Do not post abusive, defamatory, or harmful content.</li>
            <li>Do not impersonate any person or entity.</li>
            <li>Do not attempt unauthorized system access.</li>
            <li>Do not disrupt website functionality.</li>
          </ul>
        </div>

        {/* INTELLECTUAL PROPERTY */}
        <Section
          title="Intellectual Property"
          content={`All Mockshala content including text, graphics, logos, images, and software is protected by intellectual property laws. You may not reproduce or distribute content without permission.`}
        />

        {/* DISCLAIMER */}
        <Section
          title="Disclaimer"
          content={`Content on Mockshala is for educational purposes only. We do not guarantee accuracy or reliability and are not responsible for decisions based on the information provided.`}
        />

        {/* TERMINATION */}
        <Section
          title="Termination"
          content={`Mockshala reserves the right to suspend or terminate access at any time without prior notice for violations.`}
        />

        {/* GOVERNING LAW */}
        <Section
          title="Governing Law"
          content={`These Terms are governed by the laws of Rewa, Madhya Pradesh. Any disputes will be subject to the jurisdiction of courts in Rewa.`}
        />

        {/* CONTACT */}
        <Section
          title="Contact Information"
          content={`For any questions or concerns regarding these Terms, please contact us.`}
        />

        {/* FOOT NOTE */}
        <p className="text-xs md:text-sm text-subtitle-gray leading-relaxed">
          Thank you for using Mockshala. We hope you have a positive and enriching experience.
        </p>

      </div>
    </div>
  );
}

export default TermsConditions;

/* ---------- Reusable Components ---------- */

function Heading({ title }: { title: string }) {
  return (
    <div className="inline-block group">
      <h2 className="text-lg md:text-xl font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-2">
      <Heading title={title} />

      <p className="text-xs md:text-sm text-subtitle-gray leading-relaxed max-w-3xl mx-auto">
        {content}
      </p>
    </div>
  );
}