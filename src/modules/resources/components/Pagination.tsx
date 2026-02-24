import React from "react";


interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number; 
}

function Pagination({ page, setPage, totalPages }: PaginationProps) {
  
  
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
     
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

 
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-6">
      
     
      {getPageNumbers().map((item, index) => (
        <React.Fragment key={index}>
          {item === "..." ? (
            <span className="px-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => setPage(item as number)}
              className={`px-3 py-1 border rounded transition ${
                page === item
                  ? "bg-blue-600 text-white font-medium" 
                  : "hover:bg-gray-100 text-gray-700" 
              }`}
            >
              {item}
            </button>
          )}
        </React.Fragment>
      ))}

      

    </div>
  );
}

export default Pagination;