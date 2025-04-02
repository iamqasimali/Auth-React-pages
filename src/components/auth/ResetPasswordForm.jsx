import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resendOtp, resetPassword } from "@/services/apis/auth";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password visibility

// Validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordForm = ({
  flag,
  setFlag,
  email,
  onForgotPasswordSuccess,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state for handling API errors
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // To toggle confirm password visibility

  // Formik hook setup
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(""); // Clear any previous error messages
      setSuccessMessage(""); // Clear any previous success message

      const params = {
        user: {
          email: email,
          password: values.password,
          password_confirmation: values.confirmPassword,
        },
      };
      try {
        // Simulate API call for sending OTP or reset password email
        const response = await resetPassword(params);

        // Handle successful response
        console.log("Response", response);
        if (response.status.code === 200) {
          setSuccessMessage(
            "Password reset instructions have been sent to your email."
          );
          navigate("/auth/login");  
        } else {
          setError("Failed to send password reset email.");
        }

        // Optionally call the success callback function if provided
        if (onForgotPasswordSuccess) {
          onForgotPasswordSuccess(response.data);
        }
      } catch (error) {
        // Handle API errors
        console.error("Error:", error);
        setError("Failed to send password reset email. Please try again.");
      } finally {
        setLoading(false); // Stop loading state
      }
    },
  });

  return (
    <>
      <div className="flex justify-center items-center w-full overflow-y-auto no-scrollbar">
        <div className="bg-white dark:bg-[#0f172a] shadow-lg rounded-lg mx-4 lg:mx-0 p-4 sm:p-16 w-[576px] bg-opacity-80">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
              Reset Password
            </h2> 
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
              Enter your new password to reset your account password
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-6">
            {/* Password Field */}
            <div className="mb-4 relative">
              <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 ">
              <label className="block text-gray-600 dark:text-gray-300 text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-xs my-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-xs my-4">{successMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Reset Password"
              )}
              {loading && "Sending..."} {/* Show the text while loading */}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Remembered your password?{" "}
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
