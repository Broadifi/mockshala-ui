import { formatDate } from "@/utils/formatting/formatDate";
import { IMAGE_BASE_URL } from "@/api/url";
import type { Daum } from "@/api/model/resource";
import { FileText } from "lucide-react";

function ResourceCard({ item }: { item: Daum }) {
  const hasPdf = Boolean(item.file?.path);
  const pdfUrl = hasPdf ? IMAGE_BASE_URL + item.file?.path : undefined;
  
 
  const categoryName = item.examCategory?.categoryName || "RESOURCE";

  
  const containerClasses = `flex flex-col bg-white border border-gray-200 rounded-2xl p-5 h-full transition-all duration-300 w-full ${
    hasPdf ? "cursor-pointer hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 group" : "cursor-default"
  }`;

  const CardContent = (
    <>
      
      <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase w-fit tracking-wider mb-4 shrink-0">
        {categoryName}
      </div>

      
      <div className="flex-1 w-full mb-4">
        <h3 className="font-bold text-gray-800 text-sm sm:text-[15px] line-clamp-3 leading-snug uppercase">
          {item.title}
        </h3>
      </div>

     
      <div className="flex items-center justify-between w-full mt-auto pt-2  shrink-0">
        
       
        <p className="text-gray-400 text-xs sm:text-sm font-medium whitespace-nowrap">
          {formatDate(item.publishedDate)}
        </p>

        
        {hasPdf ? (
          <div className="w-9 h-9 rounded-full bg-linear-to-r from-blue-600 to-sky-500  flex items-center justify-center text-white shrink-0 group-hover:bg-blue-700 transition-colors shadow-sm">
            <FileText size={16} />
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
