import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "../Config/Auth";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Check if user is already logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/"); // redirect to dashboard/home if already logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ---------- Normal Email/Password Signup ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      toast.warn("Please fill out all fields");
      return;
    }

    setLoading(true);
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      toast.success("Sign-up successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const message =
        error.code === "auth/email-already-in-use"
          ? "Email already in use. Try logging in."
          : error.code === "auth/weak-password"
          ? "Password should be at least 6 characters."
          : "Sign-up failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Google Signup ----------
  const handleGoogleSignup = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}!`);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  // ✅ If user is already logged in, don't show form
  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Create Account
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
              required
            />
          </div>

          {/* Email/Password Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Google Signup Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium text-gray-700">
              Sign Up with Google
            </span>
          </button>
        </div>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-indigo-600 font-medium hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
