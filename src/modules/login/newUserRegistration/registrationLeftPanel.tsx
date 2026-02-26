import { mockShalaLogo, registration } from "@/assets";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";

function RegistrationLeftPanel() {
  return (
    <div className="bg-gray-100 relative hidden md:flex flex-col items-center justify-center overflow-hidden p-8 w-full h-full min-h-105 isolate">
      {/* MockShala Logo */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <ImageWithFallback
          src={mockShalaLogo}
          alt="mockShalaLogo"
          className="h-7 w-auto"
        />
      </div>

      {/* Verification Illustration Container */}
      <div className="relative flex items-center justify-center w-full h-full flex-col">
        {/* SVG Illustration - Phone Verification */}
        <ImageWithFallback
          src={registration}
          alt="registration"
          className="
    object-contain
    mix-blend-multiply
    bg-transparent
    pointer-events-none
  "
        />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-16 text-center px-4">
        <h3 className="text-gray-500 font-bold text-[18px] mb-2">
          Step 2: Verification
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed">
          Just one more step to start your
          <br />
          preparation journey.
        </p>
      </div>
    </div>
  );
}

export default RegistrationLeftPanel;
