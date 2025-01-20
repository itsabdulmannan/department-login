import React from "react";
import { motion } from 'framer-motion';

const AbstractAssignPaperModal = ({ isOpen, onClose, abstract, manuscriptTitle  }) => {
  if (!isOpen) return null; // Don't render modal if not open

  // Framer Motion Variants for Animation
  const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
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
          height: "70%",
        }}
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-lg  mb-4 text-darkText border-b border-gray-200 pb-2">
          <span className="font-bold">Title: </span> {manuscriptTitle}
        </h2>
        <p className="text-gray-700 mb-6">
          <span className="font-bold">Abstract: </span> 
          {abstract}
        </p>
        <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-900"
        >
          Close
        </button>
        </div>
       
      </motion.div>
    </motion.div>
  );
};

export default AbstractAssignPaperModal;
