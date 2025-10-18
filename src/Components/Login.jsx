import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "../Config/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- Redirect if already logged in ----------
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard"); // redirect to dashboard if logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ---------- Email/Password Login ----------
  const Submitbtn = async () => {
    if (!email || !pass) {
      toast.warn("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message.replace("Firebase:", "").trim());
    } finally {
      setLoading(false);
    }
  };

  // ---------- Google Login ----------
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome back, ${user.displayName}!`);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ToastContainer removed — use global one in App.jsx */}

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login to <span className="text-blue-600">PitchCraft</span>
        </h2>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          {/* Email/Password Login Button */}
          <button
            type="button"
            onClick={Submitbtn}
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg transition duration-200 ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium text-gray-700">
              Login with Google
            </span>
          </button>
        </div>

        {/* Redirect to Signup */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            className="text-blue-500 font-medium hover:underline"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
