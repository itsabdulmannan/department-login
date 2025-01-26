import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PapersApi } from "../../../libs/http-service/api/auth.api"; // Make sure this is the correct import
import { configureHeaders } from "../../../libs/http-service/interceptors/http.interceptors";
import { toast } from "react-toastify";

configureHeaders();

const useHooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(null);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);


  // Fetch Papers with dynamic query params
  const SectionHeadAssignedPapers = async (status,sectionHeadId ) => {
    setLoading(true);
    setError(null);

    const params = { status: status, sectionHeadId };

    try {

      const response = await PapersApi.getSectionHeadAssignedPaper(params);
      const assignedPapers = response.assignedPapers; 
      setAllData(assignedPapers); 
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updatesectionHeadStatus = async (paperId, status, comment, date, sectionHeadIds) => {
    setLoading(true);
    setError(null);
    const body = {
      status,
      comment,
      date,
      sectionHeadIds,
    };
  
    try {

      const response = await PapersApi.updateSectionHeadStatus(paperId, body);
  
      if (response.status === true) {
        console.log("Paper status updated successfully");
      } else {
        throw new Error(response.message || "Failed to update status");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return {
    SectionHeadAssignedPapers,
    updatesectionHeadStatus,  
    pagination,
    loading,
    allData,
    error,
  };
};

export default useHooks;
