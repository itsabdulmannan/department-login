import React from "react";
import useOutsideClick from "../../outSideClickHook/index";
import useHooks from "../../../containers/dashboard/allPapers/useHook";  

const AcceptAndPublishModal = ({ isOpen, toggleModal, paperId }) => {
  const modalRef = useOutsideClick(() => {
    if (isOpen) toggleModal();
  });

  const { updateStatus, loading } = useHooks();

  const handleAccept = () => {
    updateStatus(paperId, "acceptAndPublish");  
    toggleModal(); 
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fadeBg">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div
            ref={modalRef}  // Attach ref to detect outside clicks
            className="bg-white w-96 rounded-lg shadow-lg p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-darkText hover:text-secondary"
            >
              ×
            </button>

            {/* Modal Header */}
            <h3 className="text-lg text-center font-semibold mb-4 text-primaryText">
              Are you sure you want to accept and publish?
            </h3>

            {/* Modal Actions */}
            <div className="flex justify-between">
              <button
                onClick={handleAccept}
                disabled={loading}  // Disable the button while loading
                className="px-4 py-2 bg-secondary text-white font-semibold rounded hover:bg-primary"
              >
                {loading ? "Publishing..." : "Accept and Publish"}
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 text-darkText font-semibold rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptAndPublishModal;
