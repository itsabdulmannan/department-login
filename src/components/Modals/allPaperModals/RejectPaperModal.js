import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useOutsideClick from "../../outSideClickHook/index"; // Custom hook to detect clicks outside the modal
import useHooks from "../useHook"; // Custom hook for fetching and updating data
import { toast } from "react-toastify";

const RejectPaperModal = ({
  isRejectModalOpen,
  toggleRejectModal,
  paperId,
  fetchPapers,
  pageSize, // Receive pageSize as a prop
  currentPage,
}) => {
  const [remarks, setRemarks] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { rejectPaper, loading, allData, error } = useHooks();

  const modalRef = useOutsideClick(() => {
    if (isRejectModalOpen) toggleRejectModal();
  });

  const onSubmit = async (data) => {
    const comment = data.remark.trim();
    const newRemark = data.remark.trim();

    try {
      setRemarks([...remarks, newRemark]);

      await rejectPaper(paperId, "rejected", comment, new Date().toISOString());
      toast.success("Paper rejected successfully.");
      fetchPapers("submitted", {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      });
      reset();
      toggleRejectModal();
    } catch (err) {
      toast.error("Failed to reject the paper. Please try again.");
      console.error("Error while rejecting paper:", err);
    }
  };

  if (!isRejectModalOpen) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fadeBg">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white w-[90%] sm:w-96 rounded-lg shadow-lg p-6 relative"
        >
          <button
            onClick={toggleRejectModal}
            className="absolute top-3 right-3 text-darkText hover:text-secondary"
          >
            ×
          </button>

          <h3 className="text-lg text-center font-semibold mb-4 text-primaryText">
            Add Remarks for Rejection
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <textarea
              placeholder="Add your remarks for rejection..."
              {...register("remark", {
                required: "Remarks are required",
                maxLength: {
                  value: 500,
                  message: "Remarks cannot exceed 500 characters",
                },
              })}
              className={`border p-2 rounded mb-2 resize-none h-24 ${
                errors.remark ? "border-secondary " : "border-primary "
              } focus:outline-none`}
            />
            {errors.remark && (
              <p className="text-red-500 text-sm mb-2">
                {errors.remark.message}
              </p>
            )}
            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-secondary text-white font-semibold rounded hover:bg-primary"
            >
              Add Remarks and Reject
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RejectPaperModal;
