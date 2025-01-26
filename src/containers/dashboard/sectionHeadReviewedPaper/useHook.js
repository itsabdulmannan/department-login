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



  const fetchSectionHeadReviewedPaper = async (status,sectionHeadId ) => {
    setLoading(true);
    setError(null);

    const params = { status: status, sectionHeadId };

    try {
      const response = await PapersApi.getSectionHeadAssignedPaper(params);
      setPagination(response.pagination);
      const assignedPapers = response.assignedPapers; 
      setAllData(assignedPapers); 
      setPagination(response.pagination);

    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchPapersById = async (paperId) => {
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
    fetchSectionHeadReviewedPaper,
    fetchPapersById,
    loading,
    pagination,
    allData,
    dataByID,
    error,
  };
};

export default useHooks;
