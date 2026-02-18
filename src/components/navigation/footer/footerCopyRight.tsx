import { Link, useParams } from "@tanstack/react-router";

function FooterCopyRight() {
  const { lang } = useParams({ from: "/$lang" });

  const footerLinks = [
    { label: "About", path: "/$lang/about/" },
    { label: "Privacy Policy", path: "/$lang/privacyPolicy/" },
    { label: "Terms & Condition", path: "/$lang/termsofCondition/" },
    { label: "Cancellation & Refund", path: "/$lang/cancellationRefund/" },
  ];

  return (
    <div className="pt-4 pb-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
          
          {/* COPYRIGHT */}
          <p className="text-subtitle-gray text-sm text-center lg:text-left">
            © Mockshala 2026. All Rights Reserved.
          </p>

          {/* LINKS */}
          <ul className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label} className="flex items-center gap-2">
                
                {/* BULLET */}
                <span className="h-1.5 w-1.5 rounded-full bg-title-gradient-blue shrink-0"></span>

                {/* LINK */}
                <Link
                  to={link.path}
                  params={{ lang }}
                  className="text-title-darkblue hover:text-button-blue transition-colors"
                >
                  {link.label}
                </Link>

              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default FooterCopyRight;