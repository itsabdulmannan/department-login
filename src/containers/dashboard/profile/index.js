import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useHooks from "./useHook";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { getUserProfile, updateUserProfile, loading, error, data } = useHooks();
  const [userName, setUserName] = useState({ firstName: "", lastName: "", title:"" });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("title", data.title);
      setValue("country", data.country);
      setValue("specialization", data.specialization);
      setValue("affiliation", data.affiliation);
      setValue("phone", data.phone);

      setUserName({title:data.title, firstName: data.firstName, lastName: data.lastName });
    }
  }, [data, setValue]);

  const goToHome = () => {
    const role = localStorage.getItem("Role");
  
    if (role === "sectionHead") {
      navigate("/section-head-assigned-paper"); 
    } else if (role === "cheifEditor") {
      navigate("/");
    } else {
      navigate("/"); 
    }
  };
  

  const onSubmit = (formData) => {
    updateUserProfile(formData);
    goToHome(); 
  };

  return (
    <>
      <div className="flex items-center gap-6 mb-4">
        <h1 className="text-lg sm:text-2xl text-primaryText font-semibold whitespace-nowrap">
          Update Profile
        </h1>
      </div>
      <div className="bg-white rounded-lg border-[0.3px] border-gray-200 overflow-x-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <select
                id="title"
                {...register("title", { required: "Title is required" })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select title</option>
                <option value="Mr">Mr.</option>
                <option value="Ms">Ms.</option>
                <option value="Dr">Dr.</option>
              </select>
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Pakistan">Pakistan</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                placeholder="e.g. ABC"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                placeholder="e.g. ABC"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specialization */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
              >
                Specialization*
              </label>
              <select
                id="specialization"
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select Specialization</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>
              {errors.specialization && (
                <p className="text-red-500 text-sm">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            {/* Affiliation */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="affiliation"
                className="block text-sm font-medium text-gray-700"
              >
                Affiliation*
              </label>
              <input
                type="text"
                id="affiliation"
                {...register("affiliation", {
                  required: "Affiliation is required",
                })}
                placeholder="Your Affiliation"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.affiliation && (
                <p className="text-red-500 text-sm">
                  {errors.affiliation.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                placeholder="Your Email"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone*
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="0304-1111111"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password*
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Your Password"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Sign Up Button */}
          <div className=" w-fit " >
            <button
              type="submit"
              className="w-full flex justify-center mt-4 sm:mt-8 py-2 px-4 bg-secondary text-white rounded-md hover:bg-primary focus:outline-none"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ProfileSetting;