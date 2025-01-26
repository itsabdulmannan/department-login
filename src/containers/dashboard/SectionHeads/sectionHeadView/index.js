import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useHooks from "../useHook";

const SectionHeadDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const sectionHeadId = state?.sectionHeadId;


  const { viewSectionHead, sectionHeadDetails, loading, error } = useHooks();

  useEffect(() => {
    if (sectionHeadId) {
      viewSectionHead(sectionHeadId);
    }
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          Cheif Editor Detail
        </h1>
      </div>
      {sectionHeadDetails && (
        <div className="bg-white rounded-md p-6 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Name
              </span>
              <span className="text-base whitespace-nowrap">
                {`${sectionHeadDetails.sectionHead?.firstName ?? "N/A"} ${
                  sectionHeadDetails.sectionHead?.lastName ?? ""
                }`}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Phone number
              </span>
              <span className="text-base">
                {sectionHeadDetails.sectionHead?.phone ?? "N/A"}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Email
              </span>
              <span className="text-base whitespace-nowrap">
                {sectionHeadDetails.sectionHead?.email ?? "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Specialization
              </span>
              <span className="text-base">
                {sectionHeadDetails.sectionHead?.specialization ?? "N/A"}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Affiliation
              </span>
              <span className="whitespace-nowrap">
                {sectionHeadDetails.sectionHead?.affiliation ?? "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-primaryText text-lg font-semibold whitespace-nowrap">
                Total Assigned Paper
              </span>
              <span className="text-base whitespace-nowrap">
                {sectionHeadDetails.sectionHead?.totalAssignedPapers ?? 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* table */}

      <div className="bg-white rounded-lg border-[0.3px] border-gray-200 overflow-x-auto mt-6">
        <table className="w-full divide-y  divide-gray-200">
          <thead>
            <tr className="whitespace-nowrap">
              <th className="py-4 px-4 text-start  font-semibold text-primaryText">
                Sr No
              </th>
              <th className="py-4 px-4 text-start  font-semibold text-primaryText">
                Manuscript Title
              </th>
              <th className="py-4 px-4 text-start  font-semibold text-primaryText">
                Manuscript Type
              </th>

              <th className="py-4 px-4 text-start   font-semibold text-primaryText">
                Subject
              </th>
              <th className="py-4 px-4 text-start   font-semibold text-primaryText">
                Status
              </th>
              {/* <th className="py-4 px-4 text-start  font-semibold text-primaryText">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sectionHeadDetails?.assignedPapers?.length > 0 ? (
              sectionHeadDetails.assignedPapers?.map((paper, index) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {paper.manuScriptTitle}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {paper.manuScriptType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {paper.subject}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-darkText">
                    {paper.paperStatus}
                  </td>
                  {/* <td className="px-4 py-4">
                    <div className="flex justify-start">
                      <button
                        onClick={() => {
                          navigate(`/paper/${paper.id}`);
                        }}
                        className="px-2 py-1 bg-red-600 rounded-sm text-white"
                      >
                        <MdOutlineDelete size={20} className="w-4" />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-xs md:text-sm font-normal text-darkGreyText"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionHeadDetail;
