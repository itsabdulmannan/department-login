
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useHooks from "../useHook"; // Update path as needed
import { toast } from "react-toastify";

const ViewRejectedPaper = () => {
  const { state } = useLocation();
  const paperId = state?.paperId; 
  const { fetchRejectedPapersById, loading, dataByID, error } = useHooks();

  useEffect(() => {
    if (paperId) {
        fetchRejectedPapersById(paperId);
    } else {
      toast.error("Paper ID is missing.");
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error); 
    }
  }, [error]);

  if (loading) {
    return <p>Loading paper details...</p>;
  }

  if (!dataByID || dataByID.length === 0) {
    return <p>No paper details found.</p>;
  }

  return (
    <div className="">
      {dataByID && dataByID.length > 0 ? (
        dataByID.map((item, index) => (
          <div key={index}>
            <div className="bg-primary p-4 rounded-t-md">
              <h1 className="text-secondaryText text-2xl font-bold">
                {item.manuScriptTitle}
              </h1>
              <p className="text-secondaryText text-sm">
                {item.manuScriptType}
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Subject
                </h2>
                <p className="text-darkText">{item.subject}</p>
              </div>

              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Abstract
                </h2>
                <p className="text-darkText">{item.abstract}</p>
              </div>

              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Authors
                </h2>
                {/* Null check before mapping over authors */}
                {item.authors && item.authors.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {item.authors.map((author, index) => (
                      <li key={index} className="text-darkText">
                        <span className="font-semibold">{author.fullName}</span>{" "}
                        ({author.country}) -{" "}
                        <span className="text-secondaryText">
                          {author.affiliation}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No authors available.</p>
                )}
              </div>

              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Reviewers
                </h2>
                {/* Null check before mapping over reviewers */}
                {item.reviewers && item.reviewers.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {item.reviewers.map((reviewer, index) => (
                      <li key={index} className="text-darkText">
                        <span className="font-semibold">
                          {reviewer.fullName}
                        </span>{" "}
                        ({reviewer.country}) -{" "}
                        <span className="text-secondaryText">
                          {reviewer.affiliation}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviewers available.</p>
                )}
              </div>

              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Status History
                </h2>
                {/* Null check before mapping over statusHistory */}
                {item.statusHistory && item.statusHistory.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {item.statusHistory.map((status, index) => (
                      <li key={index} className="text-darkText">
                        <span className="font-semibold">{status.status}</span>{" "}
                        on {new Date(status.date).toLocaleDateString()} -{" "}
                        {status.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No status history available.</p>
                )}
              </div>

              <div>
                <h2 className="text-primaryText font-semibold text-lg">
                  Current Status
                </h2>
                <p
                  className={`font-semibold text-${
                    item.paperStatus === "rejected" ? "red-500" : "green-500"
                  }`}
                >
                  {item.paperStatus}
                </p>
              </div>

              {item.mainManuscript && (
                <div>
                  <h2 className="text-primaryText font-semibold text-lg">
                    Main Manuscript
                  </h2>
                  <a
                    href={item.mainManuscript}
                    target="_blank"
                    download
                    className="text-secondaryText underline"
                  >
                    View Manuscript
                  </a>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="py-8 text-center text-xs md:text-sm font-normal text-darkGreyText">
          No Records Found
        </p>
      )}
    </div>
  );
};

export default ViewRejectedPaper;
