import { aboutus } from "@/assets";
import { useEffect } from "react";

function AboutPage() {
  // Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full container px-4 py-2 mx-auto border-b">
      
      {/* HERO IMAGE */}
      <div className="w-full h-[220px] md:h-[320px] lg:h-[380px] overflow-hidden">
        <img
          src={aboutus}
          alt="About Mockshala"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-14">
        
        {/* ABOUT US */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky 
          bg-clip-text text-transparent">
              About Us
            </h1>

            {/* Animated underline */}
            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-subtitle-gray leading-relaxed text-base md:text-lg">
            Welcome to Mockshala, your trusted partner in the journey towards
            success in banking, SSC, and state-level examinations. At Mockshala,
            we understand the challenges and aspirations of every aspirant, and
            we are committed to providing a comprehensive and effective platform
            for exam preparation.
          </p>
        </div>

        {/* MISSION */}
        <div className="space-y-2">
          <div className="inline-block group">
            <h2 className="text-2xl md:text-3xl font-semibold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky 
          bg-clip-text text-transparent">
              Our Mission
            </h2>

            {/* Animated underline */}
            <div className="mt-2 h-1 w-0 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky rounded-full transition-all duration-500 group-hover:w-full"></div>
          </div>

          <p className="text-subtitle-gray leading-relaxed text-base md:text-lg">
            At the core of Mockshala's mission is the belief that quality
            education should be accessible to everyone. We strive to empower
            aspirants with the knowledge and skills needed to excel in their
            chosen examinations.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;