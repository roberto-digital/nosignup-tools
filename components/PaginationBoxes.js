import React, { useContext } from "react";
import { ToolsContext } from "../contexts/ToolsContext";

function PaginationBoxes({ numberOfPages, navigateToPage }) {
  const { pagination } = useContext(ToolsContext);

  if (numberOfPages <= 1) return null;
  return (
    <div className="flex-1 flex flex-wrap item-center justify-center mb-4 text-gray-900">
      {pagination.page > 2 && (
        <div>
          <a
            href="#"
            onClick={() => navigateToPage(1)}
            className="no-underline w-20 h-12 mx-2 my-2 sm:my-0 flex justify-center items-center border border-gray-300 rounded-sm transition-colors duration-200 ease hover:border-blue-400 hover:text-gray-400"
          >
            First
          </a>
        </div>
      )}
      {pagination.page > 1 && (
        <div>
          <a
            href="#"
            onClick={() => navigateToPage(pagination.page - 1)}
            className="no-underline w-20 h-12 mx-2 my-2 sm:my-0 flex justify-center items-center border border-gray-400 rounded-sm transition-colors duration-200 ease hover:border-gray-400 hover:text-gray-400"
          >
            Prev
          </a>
        </div>
      )}
      {[...Array(100)].slice(0, numberOfPages).map((number, i) => (
        <a
          key={number}
          href="#"
          onClick={() => navigateToPage(i + 1)}
          className="no-underline w-10 h-12 mx-2 my-2 sm:my-0 flex justify-center items-center border border-gray-400 rounded-sm transition-colors duration-200 ease hover:border-gray-400 hover:text-gray-400"
        >
          {i + 1}
        </a>
      ))}
      {pagination.page !== numberOfPages && (
        <div>
          <a
            href="#"
            onClick={() => navigateToPage(pagination.page + 1)}
            className="no-underline w-20 h-12 mx-2 my-2 sm:my-0 flex justify-center items-center border border-gray-400 rounded-sm transition-colors duration-200 ease hover:border-gray-400 hover:text-gray-400"
          >
            Next
          </a>
        </div>
      )}
      {pagination.page < Math.ceil(numberOfPages / 2) && (
        <div>
          <a
            href="#"
            onClick={() => navigateToPage(numberOfPages)}
            className="no-underline w-20 h-12 mx-2 my-2 sm:my-0 flex justify-center items-center border border-gray-400 rounded-sm transition-colors duration-200 ease hover:border-gray-400 hover:text-gray-400"
          >
            Last
          </a>
        </div>
      )}
    </div>
  );
}

export default PaginationBoxes;
