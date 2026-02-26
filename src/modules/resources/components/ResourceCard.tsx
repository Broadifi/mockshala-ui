import { formatDate } from "@/utils/formatting/formatDate";
import { IMAGE_BASE_URL } from "@/api/url";
import type { Daum } from "@/api/model/resource";
import { ArrowRight, FileText } from "lucide-react";

function ResourceCard({ item }: { item: Daum }) {
  const hasPdf = Boolean(item.file?.path);
  const pdfUrl = hasPdf ? IMAGE_BASE_URL + item.file?.path : undefined;

  const containerClasses = `flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 border rounded-lg px-4 sm:px-6 py-3 sm:py-4 bg-white transition w-full ${
    hasPdf ? "cursor-pointer hover:bg-gray-100" : "cursor-default"
  }`;

  const CardContent = (
    <>
      {/* Left Side */}
      <div className="order-2 sm:order-1 shrink-0 flex flex-row sm:flex-row sm:items-center gap-9 sm:gap-50 text-center sm:text-left  sm:w-auto overflow-hidden">
        <p className="text-gray-400 text-sm sm:text-xs whitespace-nowrap shrink-0">
          {formatDate(item.publishedDate)}
        </p>
      </div>
      <div className="w-full sm:ml-20 sm:w-auto sm:flex-1 order-1 sm:order-2 overflow-hidden">
        <p className="font-medium uppercase text-sm sm:text-base truncate">
          {item.title}
        </p>
      </div>

      {/* Right Side */}
      <div className="order-3 sm:order-3 ml-auto sm:ml-0 shrink-0">
      {hasPdf ? (
        <div className="flex order-2 sm:order-1 items-center gap-2 text-blue-600 font-medium shrink-0 sm:mt-0 group-hover:underline">
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
      </div>
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
