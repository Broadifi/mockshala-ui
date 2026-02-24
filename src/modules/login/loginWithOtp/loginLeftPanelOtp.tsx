
import { mockShalaLogo } from "@/assets";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";
import { Trophy, GraduationCap, User } from "lucide-react";

function LoginLeftPanelOtp() {
  return (
    <div className="left-panel-bg relative hidden md:flex flex-col items-center justify-center overflow-hidden p-8 w-full h-full min-h-105">
      {/* MockShala Logo */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <ImageWithFallback
          src={mockShalaLogo}
          alt="mockShalaLogo"
          className="h-7 w-auto"
        />
      </div>

      {/* Decorative Icons Container */}
      <div className="relative flex items-center justify-center w-full h-full">
        
        {/* Top Right - Graduation Cap Icon (Dark box) */}
        <div className="absolute top-20 right-6 w-16 h-16 rounded-lg -rotate-12  bg-gray-600/40 flex items-center justify-center shadow-lg">
          <GraduationCap size={32} color="#ffffff" strokeWidth={1.5} />
        </div>

        {/* Center - Trophy Icon (Yellow/Gold box) */}
        <div className="absolute w-32 h-32 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-xl rotate-9">
          <Trophy size={64} color="#ffffff" strokeWidth={1.5} />
        </div>

        {/* Bottom Left - User Icon (Blue box) */}
        <div className="absolute bottom-24 left-5 w-15 h-15 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
          <User size={35} color="#ffffff" strokeWidth={1.5} />
        </div>

        {/* Top Left - Star Icon (Small dark) */}
        <div className="absolute top-16 left-20 w-10 h-10 rounded-full bg-blue-400/30 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-300">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Bottom Right - Sparkle Icon (Small dark) */}
        <div className="absolute bottom-32 right-12 w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-7 text-center px-4">
        <p className="text-blue-100 font-semibold text-[15px]">
          Master Your Potential
        </p>
        <p className="text-blue-300/70 text-xs mt-1 leading-relaxed">
          Experience the next generation of
          <br />
          competitive exam preparation.
        </p>
      </div>
    </div>
  );
}

export default LoginLeftPanelOtp;