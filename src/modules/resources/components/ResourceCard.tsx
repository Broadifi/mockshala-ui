import { formatDate } from "@/utils/formatting/formatDate";
import { IMAGE_BASE_URL } from "@/api/url";
import type { Daum } from "@/api/model/resource";
import { ArrowRight } from 'lucide-react';
import { FileText } from 'lucide-react';



function ResourceCard({item} : { item: Daum }) {
    return (
    <div className="flex items-center   flex-col sm:flex-row sm:items-center sm:justify-between border-1 px-4 sm:px-6 py-4 bg-gray-50 hover:bg-gray-100 transition">
      {/* Left Side */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-35 text-center sm:text-left">
        <p className="text-gray-400 text-sm sm:text-xs">
          {formatDate(item.publishedDate)}
        </p>
        <p className="font-medium uppercase text-sm sm:text-base">
          {item.title}
        </p>
      </div>

      {/* Right Side */}
      {item.file?.path ? (
        <a
          href={IMAGE_BASE_URL + item.file.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 font-medium mt-2 sm:mt-0 hover:underline"
        >
          <div className="p-2.5 rounded-2xl flex items-center justify-center bg-blue-50">
          <div className="h-4 w-4 flex items-center justify-center">
          <FileText/>
          </div>
          </div>
          <span className="text-xs">View Pdf</span>

          <div className="h-4 w-4 flex items-center justify-center">
          <ArrowRight/>
          </div>
        </a>
      ) : (
        <span className="text-gray-400 text-sm mt-2 sm:mt-0">
          No PDF available
        </span>
      )}
    </div>
  );
}

export default ResourceCard;
