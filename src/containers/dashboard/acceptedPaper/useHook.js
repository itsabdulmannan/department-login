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
  const fetchAcceptedPapers = async (status) => {
    setLoading(true);
    setError(null);

    const params = { param: status };

    try {
      console.log("Fetching Papers with status:", status);
      const response = await PapersApi.getAcceptedPaper(params);
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


  

  return {
    fetchAcceptedPapers, 
    loading,
    allData,
    error,
  };
};

export default useHooks;
