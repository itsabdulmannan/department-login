import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHooks from "../useHook";

const ViewSectionHeadAssigned = () => {
  const { state } = useLocation();
  const paperId = state?.paperId;

  const { getSectionHeadDetails, loading, sectionHeadData, error } = useHooks();

  useEffect(() => {
    getSectionHeadDetails("assigned", paperId);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const assignedTo = sectionHeadData?.[0]?.assignedTo ?? [];

  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          Section Head Details
        </h1>
      </div>
      <div className="space-y-6">
        {assignedTo?.map((sectionHead) => (
          <div
            key={sectionHead.id}
            className="bg-white rounded-md p-6 flex justify-between items-center gap-4 flex-wrap"
          >
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Name
                </span>
                <span className="text-base whitespace-nowrap">
                  {`${sectionHead.title ?? "N/A"} ${sectionHead.firstName ?? "N/A"} ${sectionHead.lastName ?? ""}`}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Phone number
                </span>
                <span className="text-base">
                  {sectionHead.phone ?? "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Email
                </span>
                <span className="text-base whitespace-nowrap">
                  {sectionHead.email ?? "N/A"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Specialization
                </span>
                <span className="text-base">
                  {sectionHead.specialization ?? "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Affiliation
                </span>
                <span className="whitespace-nowrap">
                  {sectionHead.affiliation ?? "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                  Role
                </span>
                <span className="text-base whitespace-nowrap">
                  {sectionHead.role ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSectionHeadAssigned;
