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

  const fetchReviewedPaper = async (status, { limit, offset }) => {
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
      toast.error("Failed to fetch papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewedPapersById = async (paperId) => {
    setLoading(true);
    setError(null);

    const params = { paperId: paperId };

    try {
      console.log("Fetching Papers with status:", paperId);
      const response = await PapersApi.getAcceptdPaperById(params);
      setDataByID(response.papers);
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
    fetchReviewedPaper,
    fetchReviewedPapersById,
    pagination,
    loading,
    allData,
    dataByID,
    error,
  };
};

export default useHooks;
