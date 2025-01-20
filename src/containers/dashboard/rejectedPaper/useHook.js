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
  const [error, setError] = useState(null); 

  const fetchRejectedPapers = async (status) => {
    setLoading(true);
    setError(null);

    const params = { param: status };

    try {
      const response = await PapersApi.getRejectedPaper(params);
      setAllData(response.papers);
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast.error("Failed to fetch papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return {
    fetchRejectedPapers,
    loading,
    allData,
    error,
  };
};

export default useHooks;
