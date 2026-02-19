import AllTestSeries from "./components/allTestSeries";
import CurrentAffairs from "./components/currentAffairs";
import EditorialCornerHome from "./components/EditorialCornerHome";
import Hero from "./components/hero";
import Plans from "./components/plans";
import PopularExam from "./components/popularExam";
import Stats from "./components/stats";
import WhyChoose from "./components/whyChoose";

function HomeModule() {
  return (
    <div className="w-full mx-auto space-y-12 xl:space-y-22 bg-gray-100/40 ">
      <Hero />
      <CurrentAffairs />
      <AllTestSeries />
      <PopularExam/> 
      <EditorialCornerHome/>  
      <WhyChoose />  
      <Plans/>   
      <Stats/>
      
    </div>
  );
}

export default HomeModule;
