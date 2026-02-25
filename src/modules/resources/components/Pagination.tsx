import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  maxVisiblePages = 5,
}: SmartPaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

 
  const getPaginationStyle = (isActive: boolean) => {
    return `cursor-pointer transition-all duration-300 flex items-center justify-center rounded-full w-10 h-10 border-none ${
      isActive
        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-md font-medium" 
        : "text-gray-600 hover:bg-gray-100 bg-transparent font-normal"
    }`;
  };

  const renderPaginationItems = () => {
    const items = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => onPageChange(i)}
              className={getPaginationStyle(currentPage === i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
            className={getPaginationStyle(currentPage === 1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis className="w-10 h-10 flex items-center justify-center text-gray-500" />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => onPageChange(i)}
                className={getPaginationStyle(currentPage === i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis className="w-10 h-10 flex items-center justify-center text-gray-500" />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              isActive={currentPage === totalPages}
              onClick={() => onPageChange(totalPages)}
              className={getPaginationStyle(currentPage === totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent className="flex items-center gap-1 sm:gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={`border-none bg-transparent hover:bg-gray-100 rounded-full px-3 sm:px-4 ${
              currentPage === 1 
                ? "pointer-events-none text-gray-400 opacity-50" 
                : "cursor-pointer text-gray-600"
            }`}
          />
        </PaginationItem>

        <div className='flex flex-wrap items-center justify-center gap-1 sm:gap-2'>
          {renderPaginationItems()}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={`border-none bg-transparent hover:bg-gray-100 rounded-full px-3 sm:px-4 ${
              currentPage === totalPages 
                ? "pointer-events-none text-gray-400 opacity-50" 
                : "cursor-pointer text-gray-600"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}