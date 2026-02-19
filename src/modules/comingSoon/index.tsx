import { comingSoon } from "@/assets";
import { useEffect } from "react";

export default function ComingSoon() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-100 px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={comingSoon}
            alt="Coming Soon"
            className="w-72 sm:w-96 object-contain drop-shadow-xl"
          />
        </div>

        {/* Heading */}
        {/* <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
          Coming Soon
        </h1> */}

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-lg max-w-md mx-auto">
          We are working hard to bring something amazing for you. Stay tuned —
          exciting updates are on the way!
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-4">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          <span className="w-3 h-3 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
