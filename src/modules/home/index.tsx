import AllTestSeries from "./components/allTestSeries";
import Hero from "./components/hero";
import PopularExam from "./components/popularExam";
import Stats from "./components/stats";
import WhyChoose from "./components/whyChoose";

function HomeModule() {
  return (
    <div className="w-full mx-auto space-y-12 xl:space-y-22 bg-gray-100/40 ">
      <Hero />
      
      <PopularExam/>
      <WhyChoose />
      <AllTestSeries />
      <Stats/>
      
    </div>
  );
}

export default HomeModule;
