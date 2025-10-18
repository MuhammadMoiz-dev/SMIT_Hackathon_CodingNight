import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, getAuth } from "../Config/Auth";
import { ToastContainer, toast } from "react-toastify";
import { Menu, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ children }) {
  const [userId, setUserId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId("");
      }
    });
    return () => unsubscribe();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful");
      setUserId("");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/60 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-indigo-600"
          >
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">
              P
            </span>
            PitchCraft
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {userId ? (
              <>
                <Link
                  to="/dashboard"
                  className="font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 font-medium hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 pb-6 transition-all duration-300">
            <div className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
              {userId ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1 pt-24">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-8 mt-10">
        <p>© 2025 PitchCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Navbar;
