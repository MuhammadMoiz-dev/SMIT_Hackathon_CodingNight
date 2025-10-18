import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center px-6">
      <h1 className="text-9xl font-extrabold text-blue-600 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-3 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back on track.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back Home
      </Link>

      <div className="mt-10">
        <img
          src="https://illustrations.popsy.co/blue/error-404.svg"
          alt="Page not found illustration"
          className="w-80 mx-auto opacity-90"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
