import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../../assets/images/others/logo.png";
import arrowBack from "../../../assets/images/svgs/arrowBack.svg";
import { useNavigate } from "react-router-dom";
import useHooks from "../useHooks";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, loading } = useHooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const goToHome = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/auth/login");
  };

  const onSubmit = async (data) => {
    await resetPassword(data.email);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-y-auto sm:overflow-hidden">
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-custom px-4">
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="mx-auto w-1/2" />
          </div>
          <h3 className="text-xl font-semibold text-center">
            Forgot your Password
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 bg-secondary text-white rounded-md hover:bg-primary focus:outline-none"
            >
              Send →
            </button>
          </form>
          <div className="text-center text-sm text-gray-500">
            <p>
              Already have an account?
              <a
                onClick={goToLogin}
                className="ms-2 text-secondaryText hover:underline cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
