import React, { useState } from 'react';
import Pagination from './Pagination';
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type PaginationDemoProps = {
  current_Page: number | undefined;
  total_Pages: number | undefined;
};
const PaginationDemo: React.FC<PaginationDemoProps> = ({ current_Page, total_Pages }) => {
  const [currentPage, setCurrentPage] = useState<number>(current_Page || 1);
  const [totalPages, setTotalPages] = useState<number>(total_Pages || 1);
  const [searchParams, setSearchParams] = useSearchParams();

  

  /**
   * @useEffect , 
   * @description : set the current page to the search params if it is not set
   */
  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", currentPage.toString());
      setSearchParams(searchParams);
    } else {
      setCurrentPage(Number(searchParams.get("page")));
    }
  }, []);



  /**
   * @function handlePageChange
   * @description : handle the page change and set the search params
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({
      top: window.innerHeight / 3,
      behavior: 'smooth',
      left: window.innerWidth / 2
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-8 md:space-y-12">
      {/* Current State Display */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 md:space-x-4 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-sm md:text-base text-gray-700 font-medium">Current Page:</span>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {currentPage}
          </span>
          <span className="text-sm md:text-base text-gray-500">of {totalPages}</span>
        </div>
      </div>

      {/* Main Pagination */}
      <div className="flex justify-center w-full overflow-x-auto py-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={window.innerWidth < 640 ? 3 : 5}
        />
      </div>

    </div>
  );
};

export default PaginationDemo;