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

  // Fetch Papers with dynamic query params
  const fetchPapers = async (status) => {
    setLoading(true);
    setError(null);

    const params = { param: status };

    try {
      console.log("Fetching Papers with status:", status);
      const response = await PapersApi.getAllPapers(params);
      setAllData(response.papers);
      console.log("API Response Data:", response.papers);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
      toast.error("Failed to fetch papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (paperId, status, comment, date, sectionHeadIds) => {
    setLoading(true);
    setError(null);
  
    // Prepare the request body for the API
    const body = {
      status,
      comment,
      date,
      sectionHeadIds,
    };
  
    try {
      console.log("Updating status for paper ID:", paperId);
      const response = await PapersApi.updateStatus(paperId, body);
  
      if (response.status === true) {
        toast.success("Paper status updated successfully");
      } else {
        throw new Error(response.message || "Failed to update status");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
      toast.error("Failed to update paper status. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    fetchPapers,
    updateStatus,  
    loading,
    allData,
    error,
  };
};

export default useHooks;
