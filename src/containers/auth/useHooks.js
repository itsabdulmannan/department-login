import { AuthAPI } from "libs/http-service/api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const useHooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (body) => {
    setLoading(true);
    try {
      const response = await AuthAPI.login(body);
      if (response?.data?.token) {
        const { token } = response.data;
        const  id  = response.data.user.id;
        const title = response.data.user.title;
        const firstName = response.data.user.firstName;
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Save token and role to localStorage
        localStorage.setItem("Token", token);
        localStorage.setItem("Role", userRole);
        localStorage.setItem("id", id);
        localStorage.setItem("firstName", firstName);



        toast.success("Login successful!");

        setTimeout(() => {
          if (userRole === "cheifEditor") {
            navigate("/"); 
          } else if (userRole === "sectionHead") {
            navigate("/section-head-assigned-paper"); 
          } else {
            navigate("/unauthorized");
          }
        }, 1000);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    toast.dismiss();
    try {
      const response = await AuthAPI.resetPassword({ email });

      if (response?.status === true) {
        toast.success("Password sent to your email!", {
          toastId: "reset-success",
        });
        navigate("/auth/login");
      } else {
        toast.error(
          response?.data?.message ||
            "Failed to reset password. Please try again.",
          {
            toastId: "reset-error",
          }
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage, { toastId: "reset-error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    resetPassword,
    loading,
  };
};

export default useHooks;
