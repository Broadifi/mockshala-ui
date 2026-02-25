import { formatDate } from "@/utils/formatting/formatDate";
import { IMAGE_BASE_URL } from "@/api/url";
import type { Daum } from "@/api/model/resource";
import { ArrowRight, FileText } from 'lucide-react';

function ResourceCard({ item }: { item: Daum }) {
  
  const hasPdf = Boolean(item.file?.path);
  const pdfUrl = hasPdf ? IMAGE_BASE_URL + item.file?.path : undefined;

 
  const containerClasses = `flex items-center flex-col sm:flex-row sm:items-center sm:justify-between border-1 px-4 sm:px-6 py-4 bg-white transition w-full ${
    hasPdf ? "cursor-pointer hover:bg-gray-100" : "cursor-default"
  }`;

  
  const CardContent = (
    <>
      {/* Left Side */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-35 text-center sm:text-left w-full sm:w-auto">
        <p className="text-gray-400 text-sm sm:text-xs whitespace-nowrap">
          {formatDate(item.publishedDate)}
        </p>
        <p className="font-medium uppercase text-sm sm:text-base">
          {item.title}
        </p>
      </div>

      {/* Right Side */}
      {hasPdf ? (
       
        <div className="flex items-center gap-2 text-blue-600 font-medium mt-2 sm:mt-0 group-hover:underline">
          <div className="p-2.5 rounded-2xl flex items-center justify-center bg-blue-50">
            <div className="h-4 w-4 flex items-center justify-center">
              <FileText />
            </div>
          </div>
          <span className="text-xs">View Pdf</span>

          <div className="h-4 w-4 flex items-center justify-center">
            <ArrowRight />
          </div>
        </div>
      ) : (
        <span className="text-gray-400 text-sm mt-2 sm:mt-0">
          No PDF available
        </span>
      )}
    </>
  );

  
  if (hasPdf) {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
       
        className={`${containerClasses} group`} 
      >
        {CardContent}
      </a>
    );
  }
  return <div className={containerClasses}>{CardContent}</div>;
}

export default ResourceCard;
