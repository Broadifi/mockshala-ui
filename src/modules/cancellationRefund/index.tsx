import { useEffect } from "react";

function CancellationRefund() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full container px-4 py-10 mx-auto border-b">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-10">
        
        {/* PAGE TITLE */}
        <div className="space-y-4">
          <div className="inline-block group">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              Cancellation and Refund Policy
            </h1>

            <div className="mt-2 h-1 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full w-full"></div>
          </div>
        </div>

        {/* GENERAL POLICY */}
        <Section
          title="General Policy"
          content={`At Mockshala, we strive to provide users with a valuable and enriching educational experience. Under normal circumstances, we do not offer refunds for our services. We encourage users to review course details carefully before making a purchase.`}
        />

        {/* SPECIAL CASES */}
        <div className="space-y-2">
          <Heading title="Special Cases" />

          <p className="text-xs md:text-sm text-subtitle-gray leading-relaxed max-w-3xl mx-auto">
            While refunds are generally not provided, we may consider requests in exceptional situations:
          </p>

          <ul className="text-xs md:text-sm text-subtitle-gray leading-relaxed space-y-2 list-disc list-inside text-left max-w-xl mx-auto">
            <li>
              <strong>Duplicate Purchase:</strong> If the same course or subscription is purchased more than once accidentally.
            </li>
            <li>
              <strong>Technical Issues:</strong> If technical problems prevent access to paid content and cannot be resolved by support.
            </li>
          </ul>
        </div>

        {/* REFUND PROCESS */}
        <div className="space-y-2">
          <Heading title="Refund Process" />

          <ul className="text-xs md:text-sm text-subtitle-gray leading-relaxed space-y-2 list-disc list-inside text-left max-w-xl mx-auto">
            <li>
              Contact customer support at <strong>contact@mockshala.com</strong> within 7 days of purchase or issue.
            </li>
            <li>
              Our team will review your request and respond within a reasonable time.
            </li>
            <li>
              Approved refunds will be processed using the original payment method.
            </li>
          </ul>
        </div>

        {/* POLICY CHANGES */}
        <Section
          title="Changes to the Refund Policy"
          content={`Mockshala reserves the right to modify or update this policy at any time. Changes will become effective once posted on the website.`}
        />

        {/* LEGAL NOTE */}
        <Section
          title="Legal Notice"
          content={`This policy is subject to applicable laws and regulations. Where required by law, your statutory rights will not be affected.`}
        />

        {/* FOOT NOTE */}
        <p className="text-xs md:text-sm text-subtitle-gray leading-relaxed max-w-3xl mx-auto">
          Thank you for being part of our educational community. We are committed to providing a positive and valuable learning experience.
        </p>

      </div>
    </div>
  );
}

export default CancellationRefund;

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