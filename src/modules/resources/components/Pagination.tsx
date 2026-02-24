import React from "react";


interface PaginationProps {
  page: number; 
  setPage: React.Dispatch<React.SetStateAction<number>>; 
  hasNext: boolean | undefined; 
}

function Pagination({ page, setPage, hasNext }: PaginationProps) {
  return (
    <div className="flex justify-end items-center gap-4 mt-6">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>Page {page}</span>
      
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!hasNext}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;