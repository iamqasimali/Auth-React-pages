import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "@/services/apis/auth";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { login } = useAuth();
  const navigate = useNavigate();

  // Formik hook setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values", values);
      setLoading(true);

      try {
        const response = await signin({ user: values });
        console.log("Response:", response);
        const user = response.data?.data.user; // Use response data
        const headers = response.headers; // If needed
        console.log("Headers:", headers);
        if (headers && headers.authorization) {
          login(
            headers.authorization,
            user.role,
            user.email,
            user.first_name,
            user.last_name,
            user.provider_id
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error.message);
        // Handle the error (show a message to the user or something)
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center w-full overflow-y-auto no-scrollbar">
      <div className="bg-white dark:bg-[#0f172a] shadow-lg rounded-lg mx-4 lg:mx-0 p-4 sm:p-16 w-[576px] bg-opacity-80">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
            Hey, Hello <span className="ml-1">👋</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
            Enter the information login.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password input
                name="password"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                className="mr-2 dark:text-gray-200"
                checked={formik.values.remember}
                onChange={() =>
                  formik.setFieldValue("remember", !formik.values.remember)
                }
              />
              Remember me
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition flex items-center justify-center space-x-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        {/* Social Media Sign In */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">Or sign in with</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaGithub className="text-gray-800" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaFacebook className="text-blue-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <FaTwitter className="text-blue-400" />
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;