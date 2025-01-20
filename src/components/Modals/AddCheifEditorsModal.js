import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useHooks from "../../containers/dashboard/SectionHeads/useHook";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";

const AddCheifEditorsModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createSectionHead, loading, fetchSectionHeads } = useHooks();

  const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await createSectionHead(data);
      // After creating the Section Head, fetch updated data
      await fetchSectionHeads();
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      variants={backdropVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white rounded-lg shadow-lg p-6 overflow-y-auto"
        style={{
          width: "70%",
          height: "auto",
        }}
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-red-600 hover:text-gray-800"
        >
          &times;
        </button>
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
                {...register("title", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select title</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Miss">Miss.</option>
                <option value="Ms">Ms.</option>
                <option value="Dr">Dr.</option>
                <option value="Prof">Prof.</option>
                <option value="Prof. Dr">Prof. Dr.</option>
              </select>
              {errors.title && (
                <span className="text-red-600 text-sm">Title is required</span>
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
                {...register("country", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Pakistan">Pakistan</option>
              </select>
              {errors.country && (
                <span className="text-red-600 text-sm">
                  Country is required
                </span>
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
                placeholder="e.g. ABC"
                {...register("firstName", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  First name is required
                </span>
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
                placeholder="e.g. ABC"
                {...register("lastName")}
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
                {...register("specialization", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              >
                <option value="">Select Specialization</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>
              {errors.specialization && (
                <span className="text-red-600 text-sm">
                  Specialization is required
                </span>
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
                placeholder="Your Affiliation"
                {...register("affiliation", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.affiliation && (
                <span className="text-red-600 text-sm">
                  Affiliation is required
                </span>
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
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">Email is required</span>
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
                placeholder="0304-1111111"
                {...register("phone", { required: true })}
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              />
              {errors.phone && (
                <span className="text-red-600 text-sm">Phone is required</span>
              )}
            </div>
          </div>

          <div className="flex justify-end  mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex whitespace-nowrap justify-center mt-4 py-2 px-4 bg-secondary text-white rounded-md hover:bg-primary focus:outline-none"
            >
              {loading ? "Adding..." : "Add Chief Editor"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </motion.div>
    </motion.div>
  );
};

export default AddCheifEditorsModal;
