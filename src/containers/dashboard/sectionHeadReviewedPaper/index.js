import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import useHooks from "./useHook";
import Pagination from "components/pagination";

const SectionReviewedPaper = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
  const { fetchSectionHeadReviewedPaper, loading, allData, error,pagination } = useHooks();

  const navigate = useNavigate();

  useEffect(() => {
    const sectionHeadId = localStorage.getItem("id");
    if (sectionHeadId) {
      fetchSectionHeadReviewedPaper("", sectionHeadId,{
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      });
    }
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          Reviewed Paper
        </h1>
      </div>
      <div className="bg-white rounded-lg border-[0.3px] border-gray-200 overflow-x-auto">
        <table className="w-full divide-y  divide-gray-200">
          <thead>
            <tr className="whitespace-nowrap">
              <th className="py-4 px-4 whitespace-nowrap text-start  font-semibold text-primaryText">
                Sr No
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start  font-semibold text-primaryText">
                Manuscript Type
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start  font-semibold text-primaryText">
                Manuscript Title
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start  font-semibold text-primaryText">
                Subject
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start   font-semibold text-primaryText">
                Status
              </th>

              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allData && allData.length > 0 ? (
              allData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap  text-darkText">
                  {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap  text-darkText">
                    {item.manuScriptType}
                  </td>
                  <td className="px-4 py-3 w-[150px] overflow-x-hidden whitespace-nowrap text-darkText">
                    {item.manuScriptTitle}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap  text-darkText">
                    {item.subject}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap  text-darkText">
                    {item.paperStatus}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-start]">
                      {/* Action Buttons */}

                      <button
                        onClick={() =>
                          navigate("/section-head-paper-detail", {
                            state: { paperId: item.id },
                          })
                        }
                        className="px-2 py-1 bg-green-600 rounded-sm text-white"
                      >
                        <FaRegEye size={20} className="w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-8 text-center text-xs md:text-sm font-normal text-darkGreyText"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          total={pagination.total}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SectionReviewedPaper;
