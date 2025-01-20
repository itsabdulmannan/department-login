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

  // Create Section Head
  const createSectionHead = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SectionHeadsAPI.createSectionHead(body);
      if (response && response.data && response.data.status === true) {
        toast.success("Chief Editor added successfully!");
        await fetchSectionHeads();
      } else {
        toast.error("Failed to add Chief Editor");
      }
    } catch (err) {
      setError(err.message || "Failed to create Section Head");
      console.error("API Error:", err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const viewSectionHead = async (sectionHeadId) => {
    setLoading(true);
    setError(null);
    try {
      const params = { sectionHeadId }; // Construct the query parameter
      console.log("Sending params:", params); // Check if the params are correct
      const response = await SectionHeadsAPI.viewSectionHead(params); // Pass the params to the API
      setSectionHeadDetails(response.data);
      console.log("Section Head Details:", response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch Section Head details");
      console.error("API Error:", err);
      toast.error(err.message || "Something went wrong!");
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
    error,
  };
};

export default useHooks;
