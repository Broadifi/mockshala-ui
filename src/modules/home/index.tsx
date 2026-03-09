import { useEffect } from "react";
import AllTestSeries from "./components/allTestSeries";
import CurrentAffairs from "./components/currentAffairs";
import EditorialCornerHome from "./components/EditorialCornerHome";
import Hero from "./components/hero";
import Plans from "./components/plans";
import PopularExam from "./components/popularExam";
import Stats from "./components/stats";
import WhyChoose from "./components/whyChoose";
import { useAuthStore } from "@/stores/authStore";
import { useLoginStore } from "@/stores/loginStore";

let hasAutoLoginTriggered = false;

function HomeModule() {
  const { accessToken } = useAuthStore((state) => state.auth);
  const { setLoginState } = useLoginStore();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger modal automatically if not logged in and user scrolls down 300px
      if (!hasAutoLoginTriggered && !accessToken && window.scrollY > 280) {
        hasAutoLoginTriggered = true;
        setLoginState(true);
      }
    };

    // Attach listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [accessToken, setLoginState]);

  return (
    <div className="w-full mx-auto space-y-12 lg:space-y-15 xl:space-y-20 bg-gray-100/40 ">
      <Hero />
      <CurrentAffairs />
      <AllTestSeries />
      <PopularExam />
      <EditorialCornerHome />
      <WhyChoose />
      <Plans />
      <Stats />
    </div>
  );
}

export default HomeModule;
