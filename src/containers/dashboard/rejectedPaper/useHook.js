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
  const [dataByID, setDataByID] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchRejectedPapers = async (status, { limit, offset }) => {
    setLoading(true);
    setError(null);

    const params = {
      param: status, 
      limit,         
      offset,        
    };

    try {
      const response = await PapersApi.getRejectedPaper(params);
      setAllData(response.papers);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchRejectedPapersById = async (paperId) => {
    setLoading(true);
    setError(null);

    const params = { paperId: paperId };

    try {
      const response = await PapersApi.getAcceptdPaperById(params);
      setDataByID(response.papers);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  return {
    fetchRejectedPapers,
    loading,
    fetchRejectedPapersById,
    pagination,
    allData,
    dataByID,
    error,
  };
};

export default useHooks;
