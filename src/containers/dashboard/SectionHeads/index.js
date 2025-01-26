import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useHooks from "./useHook";
import AddCheifEditorsModal from "components/Modals/AddCheifEditorsModal";
import Pagination from "components/pagination";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const SectionHeads = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { fetchSectionHeads, loading, allData, error, pagination } = useHooks();

  useEffect(() => {
    fetchSectionHeads({
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
  }, [currentPage, pageSize]);

  

  if (loading) return <div>Loading...</div>;

  const openModal = (event) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          All Section Heads
        </h1>
        <button
          onClick={openModal}
          className="flex items-center px-4 py-2 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-primary focus:outline-none"
        >
          Add Section Head
        </button>
      </div>
      <div className="bg-white rounded-lg border-[0.3px] border-gray-200 overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Sr No
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Title
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Name
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Email
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Specialization
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Affiliation
              </th>
              <th className="py-4 px-4 whitespace-nowrap text-start font-semibold text-primaryText">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allData?.length > 0 ? (
              allData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {item.specialization || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {item.affiliation || "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-start">
                      <button
                        onClick={() =>
                          navigate("/section-head-view", {
                            state: { sectionHeadId: item.id },
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
                  colSpan="9"
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
      <AddCheifEditorsModal
        isOpen={isOpen}
        position={position}
        onClose={closeModal}
        fetchSectionHeads={fetchSectionHeads}
      />
      <ToastContainer/>
    </>
  );
};

export default SectionHeads;
