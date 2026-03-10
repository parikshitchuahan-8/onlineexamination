import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Left Side */}
        <div className="flex items-center space-x-4">

          <Link to="/" className="text-2xl font-bold text-blue-600">
            ExamPortal
          </Link>

          {auth.user && (
            <>
              <Link
                to="/ai-quiz"
                className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                AI Quiz
              </Link>

              <Link
                to="/interview"
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                AI Interview
              </Link>

              <Link
                to="/study"
                className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                AI Study
              </Link>
              <Link
                to="/coding"
                className="px-3 py-2 bg-orange-600 text-white rounded-md"
              >
                AI Coding
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {auth.user ? (
            <>
              <span className="hidden sm:block font-medium">
                Welcome, {auth.user.username}
              </span>

              <Link
                to="/profile"
                className="text-gray-600 hover:text-blue-600"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}

        </div>

      </nav>
    </header>
  );
};

export default Navbar;