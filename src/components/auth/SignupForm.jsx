import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
  FaSpinner, // Add Spinner Icon
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "@/services/apis/auth";
import { useAlert } from "@/context/AlertContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignupForm = ({ flag, setFlag, setEmail }) => {
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // Formik hook setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Start the loading spinner
      try {
        const params = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
        };

        const response = await signup({ user: params });

        if (response.status.code === 200) {
          showAlert({
            variant: "success",
            title: "Success!",
            message:
              response.status.message ||
              "Signup successful. Please check your email for verification.",
            linkHref: "#",
            linkText: "Learn more",
          });

          setTimeout(function () {
            setEmail(values.email);
            setFlag(2); // Trigger OTP verification
          }, 3000);
        } else {
          showAlert({
            variant: "error",
            title: "Signup Failed!",
            message:
              response.status.message ||
              "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        showAlert({
          variant: "error",
          title: "Signup Error",
          message:
            error.message ||
            "An error occurred during signup. Please try again later.",
        });
      } finally {
        setLoading(false); // Stop the loading spinner after request is complete
      }
    },
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white dark:bg-[#0f172a] shadow-lg rounded-lg mx-4 lg:mx-0 p-4 sm:p-16 w-[576px] bg-opacity-80">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
            Hey, Hello <span className="ml-1">👋</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
            Enter the information you entered while registering.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6">
          {/* First and Last Name Fields */}
          <div className="mb-4">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                  placeholder="John"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                  placeholder="Doe"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div>

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

          {/* Password Field with Eye Icon */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition flex items-center justify-center space-x-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Signup"}
          </button>
        </form>

        {/* Social Media Sign In */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">Or sign up with</p>
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
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
