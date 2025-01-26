import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PapersApi } from "../../../libs/http-service/api/auth.api"; 
import { configureHeaders } from "../../../libs/http-service/interceptors/http.interceptors";
import { toast } from "react-toastify";

configureHeaders();

const useHooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(null);
  const [sectionHeadData, setSectionHeadDataData] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [error, setError] = useState(null);

  const fetchAssignedPapers = async (status, { limit, offset }) => {
    setLoading(true);
    setError(null);

    const params = {
      param: status, 
      limit,         
      offset,      
    };

    try {

      const response = await PapersApi.getAllPapers(params);
      setAllData(response.papers);
      setPagination(response.pagination);
      console.log("API Response Data:", response.papers);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (paperId, status, comment, date, sectionHeadIds) => {
    setLoading(true);
    setError(null);

    const body = {
      status,
      comment,
      date,
      sectionHeadIds,
    };
  
    try {

      const response = await PapersApi.updateStatus(paperId, body);
  
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


  const getSectionHeadDetails = async (status) => {
    setLoading(true);
    setError(null);

    const params = { param: status };

    try {
      const response = await PapersApi.ViewSectionHeadAssigndPaoer(params);
      setSectionHeadDataData(response.papers);
      console.log("API Response Data:", response.papers);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return {
    fetchAssignedPapers,
    updateStatus,  
    getSectionHeadDetails,
    pagination,
    loading,
    allData,
    sectionHeadData,
    error,
  };
};

export default useHooks;
