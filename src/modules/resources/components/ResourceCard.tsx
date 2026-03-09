import { formatDate } from "@/utils/formatting/formatDate";
import { IMAGE_BASE_URL } from "@/api/url";
import type { Daum } from "@/api/model/resource";
import { Download, FileText } from "lucide-react";

function ResourceCard({ item }: { item: Daum }) {
  const hasPdf = Boolean(item.file?.path);
  const pdfUrl = hasPdf ? IMAGE_BASE_URL + item.file?.path : undefined;
  
 
  const categoryName = item.examCategory?.categoryName || "RESOURCE";

  
  const containerClasses = `flex flex-col bg-white border border-gray-200 rounded-2xl p-3 min-h-[16vh] sm:min-h-[18vh] xl:min-h-[20vh] transition-all duration-300 w-full ${
    hasPdf ? "cursor-pointer hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 group" : "cursor-default"
  }`;

  const CardContent = (
    <>

    <div className="flex flex-row items-center mb-4 gap-1">  
      <div className="w-6 h-6 rounded-full border border-blue-700 text-blue-700 flex items-center justify-center  shrink-0   transition-colors shadow-sm">
            <FileText size={16}  />
          </div>
      
      <div className="bg-blue-50 text-blue-600  px-3 sm:px-3 xl:px-3 py-1  rounded-full text-[10px] sm:text-xs font-bold uppercase w-fit tracking-wider shrink-0 flex flex-row justify-center items-center gap-2">
        
        {categoryName}
      </div>
      </div> 

      
      <div className="flex-1 w-full mb-4">
         
        <h3 title={item.title} className="font-semibold text-gray-800 text-xs  sm:text-sm xl:text-base 
        line-clamp-3 uppercase">
          {item.title}
        </h3>
      </div>

     
      <div className="flex items-center justify-between w-full mt-auto pt-2  shrink-0">
        
       
        <p className="text-gray-400 text-xs sm:text-sm font-medium whitespace-nowrap">
          {formatDate(item.publishedDate)}
        </p>

        
        {hasPdf ? (
          <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full border border-blue-700 text-blue-700 flex items-center justify-center  shrink-0 group-hover:bg-blue-700  group-hover:text-white transition-colors shadow-sm">
            <Download size={16} className=" " />
          </div>
        ) : (
          <span className="text-gray-400 text-xs">
            No PDF
          </span>
        )}
      </div>
    </>
  );

  if (hasPdf) {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses}
      >
        {CardContent}
      </a>
    );
  }
  return <div className={containerClasses}>{CardContent}</div>;
}

export default ResourceCard;
