import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between  py-3 border-t border-gray-200">
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, total)}
          </span>{" "}
          of <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <MdChevronLeft className="w-5 h-5" />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-secondary text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <MdChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
