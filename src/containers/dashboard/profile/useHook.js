import { useState } from "react";
import { ProfileSetting } from "../../../libs/http-service/api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { configureHeaders } from "../../../libs/http-service/interceptors/http.interceptors";

configureHeaders(); // Call this once to set up the global headers

const useHooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  const getUserProfile = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await ProfileSetting.getUserProfileById();
      setData(response?.data); 
    } catch (err) {
      const errorMessage = "Failed to fetch profile.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await ProfileSetting.updateUserProfile(updatedData);
      setData(response?.data);
      toast.success("Profile updated successfully!");

    } catch (err) {
      const errorMessage = "Failed to update profile.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { getUserProfile, updateUserProfile, loading, error, data };
};

export default useHooks;
