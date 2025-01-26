import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import useHooks from "./useHook";
import SectionHeadRejectModal from "components/Modals/sectionHeadModal/SectionHeadRejectModal";
import SectionHeadAbstractModal from "components/Modals/sectionHeadModal/SectionHeadAbstractModal";
import SectionHeadAcceptModal from "components/Modals/sectionHeadModal/SectionHeadAcceptModal";
import Pagination from "components/pagination";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SectionHeadAssignedPaper = () => {
  const { SectionHeadAssignedPapers, loading, allData, error, pagination } =
    useHooks();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isRejectAssignModalOpen, setRejectIsAssignModalOpen] = useState(false);
  const [isAcceptReportModalOpen, setIsAcceptReportModalOpen] = useState(false);
  const [selectedAbstract, setSelectedAbstract] = useState("");
  const [selectedManuscriptTitle, setSelectedManuscriptTitle] = useState("");
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const sectionHeadId = localStorage.getItem("id");
    if (sectionHeadId) {
      SectionHeadAssignedPapers("assigned", sectionHeadId, {
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

  const handleDataUpdate = () => {
    const sectionHeadId = localStorage.getItem("id");
    if (sectionHeadId) {
      SectionHeadAssignedPapers("assigned", sectionHeadId, {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      });
    }
  };

  const toggleAcceptReportModal = (id) => {
    setSelectedPaperId(id);
    setIsAcceptReportModalOpen((prev) => !prev);
  };

  const toggleRejectModal = (id) => {
    setSelectedPaperId(id);
    setRejectIsAssignModalOpen((prev) => !prev);
  };

  const openModal = (event, abstract, manuscriptTitle) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setSelectedAbstract(abstract);
    setSelectedManuscriptTitle(manuscriptTitle);
    setIsOpen(true); 
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAbstract("");
  };


  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          Assigned Paper
        </h1>
      </div>

      <div className=" ">
        <div className="space-y-4">
          {allData && allData.length > 0 ? (
            allData.map((paper) => (
              <div
                key={paper.id}
                className="flex flex-col gap-0 bg-white rounded-md p-6 "
              >
                <h2 className="text-lg font-semibold mt-3 text-darkText">
                  {paper.manuScriptTitle}
                </h2>
                <div className="flex items-center">
                  <FaUserCircle className="text-blue-600 mr-2" />
                  <div className="flex flex-wrap gap-2">
                    {paper.authors.map((author, index) => (
                      <span
                        key={index}
                        className="font-sans text-[13px] font-bold leading-relaxed tracking-wider my-1 text-primaryText"
                      >
                        {author.fullName}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 mt-4">
                  <div className="flex gap-2">
                    <a
                      href={paper.mainManuscript}
                      download
                      className="flex items-center whitespace-nowrap px-4 py-2 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-primary focus:outline-none"
                    >
                      <MdOutlineFileDownload className="mr-2" />
                      Download PDF
                    </a>
                    <button
                      onClick={(e) =>
                        openModal(e, paper.manuScriptTitle, paper.abstract)
                      }
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg shadow-md hover:bg-gray-300"
                    >
                      <BsEye className="mr-2" />
                      View Abstract
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => toggleAcceptReportModal(paper.id)}
                      className="flex items-center px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow-md hover:bg-green-700"
                    >
                      Accept & Report
                    </button>
                    <button
                      onClick={(e) => toggleRejectModal(paper.id)}
                      className="flex items-center px-4 py-2 text-white bg-red-600 text-sm rounded-lg shadow-md hover:bg-red-900"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No papers found.</div>
          )}
        </div>
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

      {isOpen && (
        <SectionHeadAbstractModal
          isOpen={isOpen}
          onClose={closeModal}
          abstract={selectedAbstract}
          manuscriptTitle={selectedManuscriptTitle}
        />
      )}
      <SectionHeadRejectModal
        isRejectAssignModalOpen={isRejectAssignModalOpen}
        toggleRejectModal={toggleRejectModal}
        paperId={selectedPaperId}
        onUpdate={handleDataUpdate}

      />
      <SectionHeadAcceptModal
        isAcceptReportModalOpen={isAcceptReportModalOpen}
        toggleAcceptReportModal={toggleAcceptReportModal}
        paperId={selectedPaperId}
        onUpdate={handleDataUpdate}
      />
      <ToastContainer />
    </div>
  );
};

export default SectionHeadAssignedPaper;
