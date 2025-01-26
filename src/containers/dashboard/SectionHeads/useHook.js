import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeadsAPI } from "../../../libs/http-service/api/auth.api";
import { configureHeaders } from "../../../libs/http-service/interceptors/http.interceptors";
import { toast } from "react-toastify";
configureHeaders();

const useHooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(null);
  const [error, setError] = useState(null);
  const [sectionHeadDetails, setSectionHeadDetails] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchSectionHeads = async (body = { limit: 10, offset: 0 }) => {
    setLoading(true);
    setError(null);
    try {

      const response = await SectionHeadsAPI.getAllSectionHeads(body);
      setAllData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const createSectionHead = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SectionHeadsAPI.createSectionHead(body);
      if (response && response.data && response.data.status === true) {
        
      } else {
        setError("Failed to add Section Head");
      }
    } catch (err) {
      setError(err.message || "Failed to create Section Head");
    } finally {
      setLoading(false);
    }
  };

  const viewSectionHead = async (sectionHeadId) => {
    setLoading(true);
    setError(null);
    try {
      const params = { sectionHeadId };

      const response = await SectionHeadsAPI.viewSectionHead(params);
      setSectionHeadDetails(response);
    } catch (err) {
      setError(err.message || "Failed to fetch Section Head details");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchSectionHeads,
    createSectionHead,
    viewSectionHead,
    loading,
    allData,
    sectionHeadDetails,
    pagination,
    error,
  };
};

export default useHooks;
