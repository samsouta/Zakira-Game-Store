import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5
}) => {
  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisible + 1) {
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const PaginationButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    className?: string;
  }> = ({ children, onClick, isActive = false, isDisabled = false, className = '' }) => (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative min-w-[2rem] h-[2rem] md:min-w-[2.5rem] md:h-[2.5rem] px-2 md:px-3
        rounded-xl md:rounded-2xl font-medium text-sm md:text-base
        transition-all duration-300 ease-out select-none
        ${isActive
          ? 'text-white shadow-lg shadow-blue-500/25'
          : 'text-gray-700 hover:text-gray-900'
        }
        ${isDisabled
          ? 'opacity-40 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-xl hover:shadow-black/10'
        }
        ${className}
      `}
      whileHover={!isDisabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass Background */}
      <div className={`
        absolute inset-0 rounded-xl md:rounded-2xl backdrop-blur-md
        ${isActive
          ? 'bg-gradient-to-br from-blue-500/80 via-purple-500/70 to-pink-500/60'
          : 'bg-white/20 hover:bg-white/30'
        }
        border border-white/30 hover:border-white/50
        transition-all duration-300
      `} />
      
      {/* Glossy Shine Effect */}
      <div className={`
        absolute inset-0 rounded-xl md:rounded-2xl
        bg-gradient-to-br from-white/40 via-transparent to-transparent
        opacity-0 hover:opacity-100 transition-opacity duration-300
      `} />
      
      {/* Inner Glow */}
      <div className={`
        absolute inset-0 rounded-xl md:rounded-2xl
        ${isActive
          ? 'shadow-inner shadow-white/20'
          : 'shadow-inner shadow-white/10'
        }
      `} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center">
      <nav className="flex items-center gap-1 md:gap-2 p-2">
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <PaginationButton
            onClick={() => onPageChange(1)}
            className="hidden md:flex"
          >
            First
          </PaginationButton>
        )}

        {/* Previous Button */}
        <PaginationButton
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          isDisabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </PaginationButton>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className="flex items-center justify-center w-8 md:w-10">
                <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              </div>
            ) : (
              <PaginationButton
                onClick={() => onPageChange(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationButton>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <PaginationButton
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          isDisabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </PaginationButton>

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <PaginationButton
            onClick={() => onPageChange(totalPages)}
            className="hidden md:flex"
          >
            Last
          </PaginationButton>
        )}
      </nav>
    </div>
  );
};

export default Pagination;