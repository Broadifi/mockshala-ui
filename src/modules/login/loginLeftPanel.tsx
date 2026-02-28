import { BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";

function LoginLeftPanel() {
  return (
    <div className="left-panel-bg relative flex flex-col items-center justify-center overflow-hidden p-4 sm:p-8 w-full h-full min-h-105">
      {/* MockShala Logo */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-5">
        <ImageWithFallback
          src={mockShalaLogo}
          alt="mockShalaLogo"
          className="h-7 w-auto"
        />
      </div>

      {/* Orb Container */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring behind orb */}
        {/* <div className="animate-pulse-slow absolute w-[220px] h-[220px] rounded-full bg-blue-500/10" /> */}

        {/* Main orb */}
        <div className="big-orb animate-glow-pulse animate-float relative w-32 sm:w-43 h-32 sm:h-43 rounded-full flex items-center justify-center">
          <Lightbulb
            size={40}
            className="sm:w-[52px] sm:h-[52px]"
            color="rgba(219,234,254,0.85)"
            strokeWidth={1.5}
          />
        </div>

        {/* Top-right floating icon */}
        <div className="icon-pill animate-float-delay absolute -top-2 -right-5 sm:-top-3 sm:-right-7 p-1.5 sm:p-2 rounded-full">
          <GraduationCap size={14} className="sm:w-[18px] sm:h-[18px]" color="#93c5fd" />
        </div>
      </div>

      {/* Bottom-left floating book icon */}
      <div className="icon-pill absolute bottom-24 sm:bottom-25 left-5 sm:left-10 p-1.5 sm:p-2.5 rounded-xl">
        <BookOpen size={14} className="sm:w-[18px] sm:h-[18px]" color="#93c5fd" />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-5 sm:bottom-7 text-center px-3 sm:px-4">
        <p className="text-blue-100 font-semibold text-[13px] sm:text-[15px]">
          Master Your Potential
        </p>
        <p className="text-blue-300/70 text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed">
          Experience the next generation of
          <br />
          competitive exam preparation.
        </p>
      </div>
    </div>
  );
}

export default LoginLeftPanel;