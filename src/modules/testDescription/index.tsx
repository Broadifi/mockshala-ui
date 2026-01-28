import { testDescriptionKey } from "@/api";
import { testAPI } from "@/api/services/getTestDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import React from "react";

function DescriptionModule() {
  const { examCategory, testSlug } = useParams({ from: "/$lang/exams/$examCategory/$testSlug/" });

  const {data: testData} = useQuery({
    queryKey: testDescriptionKey.testDetails(examCategory,testSlug),
    queryFn: ()=> testAPI.getTestDetails(testSlug )
  })

  console.log(testData);
  
  return (
    <div className="w-full">
      <div className="w-full bg-linear-to-r from-blue-100 via-white/40 to-indigo-100 h-1/2">
        <div className="w-full container px-4 py-5 mx-auto">
            <div className="flex gap-2 text-xs text-[#1b4965] items-center">
              <span>Home</span>
               <ChevronRight size={18}/>

               <span>Exams</span>
               <ChevronRight size={18}/>

               <span>MPPSC Mock Test</span>
               
            </div>

            <div>
              <h1></h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionModule;
