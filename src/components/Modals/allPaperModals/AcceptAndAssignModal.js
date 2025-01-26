import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useOutsideClick from "../../outSideClickHook/index";
import useHooks from "../useHook";
import { toast } from "react-toastify";

const AcceptAndAssignModal = ({
  isAssignModalOpen,
  toggleAssignModal,
  paperId,
  fetchPapers,
  pageSize, // Receive pageSize as a prop
  currentPage,
}) => {
  const { fetchSectionHeads, updateStatus, loading, allData, error } =
    useHooks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [assignedNames, setAssignedNames] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const hasFetched = useRef(false);
  const modalRef = useOutsideClick(() => {
    if (!submitting) toggleAssignModal();
  });

  useEffect(() => {
    if (paperId && !hasFetched.current) {
      fetchSectionHeads();
      hasFetched.current = true;
    }
  }, [paperId, fetchSectionHeads]);

  const onSubmit = async () => {
    setSubmitting(true);
    const date = new Date().toISOString();
    const sectionHeadIds = assignedNames.map((assigned) => assigned.value);
    const status = "assigned";
    const comment = "The paper meets all the required standards.";

    try {
      // Update the status
      await updateStatus(paperId, status, comment, date, sectionHeadIds);

      // Show a success toast
      toast.success(
        "Paper status updated successfully and assigned to section head!"
      );
      // Reload updated data
      fetchPapers("submitted", {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      });

      // Reset form and close modal
      reset();
      toggleAssignModal();
    } catch (err) {
      toast.error("Failed to assign paper. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAssignModalOpen) return null;

  const options =
    allData?.map((head) => ({
      value: head.id,
      label: `${head.title} ${head.firstName} ${head.lastName}`,
    })) || [];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fadeBg">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="bg-white w-[90%] sm:w-96 rounded-lg shadow-lg p-6 relative"
        >
          <button
            onClick={() => !submitting && toggleAssignModal()}
            className="absolute top-3 right-3 text-darkText hover:text-secondary"
            disabled={submitting}
          >
            ×
          </button>
          <h3 className="text-lg text-center font-semibold mb-4 text-primaryText">
            Assign Paper
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-auto sm:h-[200px]">
            <Select
              isMulti
              name="assignee"
              options={options}
              value={assignedNames}
              onChange={setAssignedNames}
              className="mb-4"
              classNamePrefix="react-select"
              placeholder="Select section heads to assign"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className={`px-4 py-2 mt-4 font-semibold rounded ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondary hover:bg-primary text-white"
              }`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Accept and Assign"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptAndAssignModal;
