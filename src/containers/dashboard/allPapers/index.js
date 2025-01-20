import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import AbstractModal from "components/Modals/AbstractModal";
import AcceptAndPublishModal from "components/Modals/allPaperModals/AcceptAndPublishModal";
import AcceptAndAssignModal from "components/Modals/allPaperModals/AcceptAndAssignModal";
import RejectPaperModal from "components/Modals/allPaperModals/RejectPaperModal";
import useHooks from "./useHook";

const AllPapers = () => {
  const { fetchPapers, loading, allData, error } = useHooks();
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedAbstract, setSelectedAbstract] = useState("");
  const [selectedManuscriptTitle, setSelectedManuscriptTitle] = useState("");
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  useEffect(() => {
  
    fetchPapers("submitted");
  }, []);
  console.log(allData, "datta");

  const toggleModal = (id) => {
    setSelectedPaperId(id); 
    console.log(id)
    setIsModalOpen((prev) => !prev);
  };

  const toggleAssignModal = (id) => {
    setSelectedPaperId(id); 
    setIsAssignModalOpen((prev) => !prev);
  };

  const toggleRejectModal = (id) => {
    setSelectedPaperId(id); 
    setIsRejectModalOpen((prev) => !prev);
  };

  const openModal = (event, abstract, manuscriptTitle) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY }); 
    setSelectedAbstract(abstract); 
    setSelectedManuscriptTitle(manuscriptTitle); 
    setIsOpen(true); // Opens the modal
  };

  const closeModal = () => {
    setIsOpen(false); 
    setSelectedAbstract(""); 
  };

  console.log("Parent: Passing paperId", selectedPaperId);

  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          All Papers
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
                        key={index} // Unique key for each author
                        className="font-sans text-[13px] font-bold leading-relaxed tracking-wider my-1 text-primaryText"
                      >
                        {author.fullName}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <p className="font-sans italic text-[13px] font-bold text-gray-700">
                  {paper.doi} - {paper.date}
                </p> */}
                <div className="flex justify-between flex-wrap items-center gap-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={paper.mainManuscript} // Use the file URL to download
                      download // This will trigger the download
                      className="flex items-center whitespace-nowrap px-4 py-2 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-primary focus:outline-none"
                    >
                      <MdOutlineFileDownload className="mr-2" />
                      Download PDF
                    </a>

                    <button
                   onClick={(e) => openModal(e, paper.manuScriptTitle, paper.abstract)} // Pass manuscript title, abstract, and manuscript
                      className="flex items-center whitespace-nowrap px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg shadow-md hover:bg-gray-300"
                    >
                      <BsEye className="mr-2" />
                      View Abstract
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                     onClick={(e) => toggleModal( paper.id)}
                      className="flex items-center whitespace-nowrap px-4 py-2 bg-primary text-white text-sm rounded-lg shadow-md hover:bg-[#4c4b7e] focus:outline-none"
                    >
                      Accept & Publish
                    </button>
                    <button
                     onClick={(e) => toggleAssignModal( paper.id)}
                      className="flex items-center whitespace-nowrap px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow-md hover:bg-green-700"
                    >
                      Accept & Assign
                    </button>
                    <button
                     onClick={(e) => toggleRejectModal( paper.id)}
                      className="flex items-center whitespace-nowrap px-4 py-2 text-white bg-red-600 text-sm rounded-lg shadow-md hover:bg-red-900"
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

      {isOpen && (
        <AbstractModal
          isOpen={isOpen}
          onClose={closeModal}
          abstract={selectedAbstract} // Pass the abstract to the modal
          manuscriptTitle={selectedManuscriptTitle} // Pass the abstract to the modal

        />
      )}
      <AcceptAndPublishModal isOpen={isModalOpen} toggleModal={toggleModal} paperId={selectedPaperId}  />
      <AcceptAndAssignModal
        isAssignModalOpen={isAssignModalOpen}
        toggleAssignModal={toggleAssignModal}
        paperId={selectedPaperId}
      />
      <RejectPaperModal
        isRejectModalOpen={isRejectModalOpen}
        toggleRejectModal={toggleRejectModal}
        paperId={selectedPaperId}
      />
    </div>
  );
};

export default AllPapers;
