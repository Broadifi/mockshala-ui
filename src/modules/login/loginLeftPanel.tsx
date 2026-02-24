import { BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { mockShalaLogo } from "@/assets";

function LoginLeftPanel() {
  return (
    <div className="left-panel-bg relative hidden md:flex flex-col items-center justify-center overflow-hidden p-8">
            {/* MockShala Logo */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
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
              <div className="big-orb animate-glow-pulse animate-float relative w-43 h-43 rounded-full flex items-center justify-center">
                <Lightbulb
                  size={52}
                  color="rgba(219,234,254,0.85)"
                  strokeWidth={1.5}
                />
              </div>

              {/* Top-right floating icon */}
              <div className="icon-pill animate-float-delay absolute -top-3 -right-7 p-2 rounded-full">
                <GraduationCap size={18} color="#93c5fd" />
              </div>
            </div>

            {/* Bottom-left floating book icon */}
            <div className="icon-pill  absolute bottom-25 left-10 p-2.5 rounded-xl">
              <BookOpen size={18} color="#93c5fd" />
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
  )
}

export default LoginLeftPanel