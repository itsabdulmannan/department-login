import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-md">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "#353372" }}
        >
          Unauthorized
        </h1>
        <p
          className="text-lg mb-6"
          style={{ color: "#f29349" }}
        >
          You don't have permission to access this page.
        </p>
        <button
          className="px-6 py-2 text-white rounded-md"
          style={{
            backgroundColor: "#353372",
          }}
          onClick={() => (window.location.href = "/assigned-paper")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
