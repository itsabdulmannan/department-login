import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PapersApi,
  SectionHeadsAPI,
} from "../../libs/http-service/api/auth.api";
import { configureHeaders } from "../../libs/http-service/interceptors/http.interceptors";
import { toast } from "react-toastify";

configureHeaders();

const useHooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Section Heads
  const fetchSectionHeads = async (body) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Section Heads with body:", body);
      const response = await SectionHeadsAPI.getAllSectionHeads(body);
      setAllData(response.data);
      console.log("API Response Data:", response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    paperId,
    status,
    comment,
    date,
    sectionHeadIds
  ) => {
    setLoading(true);
    setError(null);

    // Prepare the request body for the API
    const body = {
      date,
      sectionHeadIds,
      status,
      comment,
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

  const rejectPaper = async (
    paperId,
    status,
    comment,
    date,
  ) => {
    setLoading(true);
    setError(null);

    // Prepare the request body for the API
    const body = {
      date,
      status,
      comment,
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
    fetchSectionHeads,
    updateStatus,
    rejectPaper,
    loading,
    allData,
    error,
  };
};

export default useHooks;
