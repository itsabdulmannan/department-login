import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useOutsideClick from "../../outSideClickHook/index"; 
import useHooks from "../../../containers/dashboard/sectionHeadAssignedPaper/useHook"; 
import { toast } from "react-toastify";

const SectionHeadAcceptModal = ({ isAcceptReportModalOpen, toggleAcceptReportModal, paperId, onUpdate }) => {
  const [remarks, setRemarks] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { updatesectionHeadStatus, loading, allData, error } = useHooks();

  const modalRef = useOutsideClick(() => {
    if (isAcceptReportModalOpen) toggleAcceptReportModal();
  });

  const onSubmit = async (data) => {
    const comment = data.remark.trim();
    const newRemark = data.remark.trim();
  
    try {
      setRemarks([...remarks, newRemark]);
  
      await updatesectionHeadStatus(paperId,"accepted",  comment,  new Date().toISOString(),  );
      toast.success("Paper accepted successfully.");

    if (onUpdate) {
      onUpdate();
    }
      reset();
      toggleAcceptReportModal();
    } catch (err) {
      console.error("Error while rejecting paper:", err); 
    }
  };
  
  if (!isAcceptReportModalOpen) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fadeBg">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white w-[90%] sm:w-96 rounded-lg shadow-lg p-6 relative"
        >
          <button
            onClick={toggleAcceptReportModal}
            className="absolute top-3 right-3 text-darkText hover:text-secondary"
          >
            ×
          </button>

          <h3 className="text-lg text-center font-semibold mb-4 text-primaryText">
            Accept & Report
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <textarea
              placeholder="Add your remarks for rejection..."
              {...register("remark", {
                required: "Remarks are required",
                maxLength: { value: 500, message: "Remarks cannot exceed 500 characters" },
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
              Add Remarks and Accept
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionHeadAcceptModal;
