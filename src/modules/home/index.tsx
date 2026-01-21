import Hero from "./components/hero";
import PopularExam from "./components/popularExam";
import WhyChoose from "./components/whyChoose";

function HomeModule() {
  return (
    <div className="w-full mx-auto space-y-12 xl:space-y-25 bg-gray-100/40 ">
      <Hero />
      <PopularExam/>
      <WhyChoose />
    </div>
  );
}

export default HomeModule;
