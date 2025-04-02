import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAlert } from "@/context/AlertContext";
import * as Yup from "yup";
import { verifyOtp, resendOtp } from "@/services/apis/auth"; // Assuming resendOtp is an API function

// Validation schema for OTP
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 characters")
    .required("OTP is required"),
});

const OTPVerificationForm = ({ email, from, flag, setFlag }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // For disabling resend OTP button
  const [timer, setTimer] = useState(60); // Timer state to show countdown
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [processState, setProcessState] = useState(false);

  // Function to handle input change and focus
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Update the OTP array on the correct index
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); // Ensure only one character is allowed per input
    setOtp(updatedOtp);

    // Focus the next input field if the value is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Function to handle backspace (focus previous input if current is empty)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: otp.join(""), // Initialize formik with the current OTP
    },
    validationSchema: otpValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await verifyOtp({
          otp_code: values.otp,
          email: email,
        });
        console.log("OTP verification response:", response);

        if (response.status.code === 200) {
          showAlert({
            variant: "success",
            title: "Success!",
            message: "OTP Verified Successfully. You can now log in.",
          });

          setTimeout(function () {
            if (from === undefined || from === "signup") {
              navigate("/auth/login");
            } else if (from === "resetPassword") {
              setFlag(3);
            }
          }, 2000);
        } else {
          showAlert({
            variant: "error",
            title: "Verification Failed",
            message:
              response.status.message ||
              "OTP verification failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("OTP verification error:", error);
        showAlert({
          variant: "error",
          title: "Verification Error",
          message:
            error.message ||
            "An error occurred during OTP verification. Please try again later.",
        });
      }
    },
  });

  // UseEffect to sync formik's otp with otp state
  useEffect(() => {
    if (otp.join("") !== formik.values.otp) {
      formik.setFieldValue("otp", otp.join(""));
    }
  }, [otp, formik]);

  // Resend OTP function
  const handleResendOtp = async () => {
    try {
      setProcessState(true);
      const response = await resendOtp({ email: "verifyotp1@gmail.com" });
      if (response.status.code === 200) {
        showAlert({
          variant: "success",
          title: "OTP Resent",
          message: "A new OTP has been sent to your email address.",
        });

        // Disable the resend OTP button for 60 seconds
        setIsButtonDisabled(true);
        setTimer(60);
      } else {
        showAlert({
          variant: "error",
          title: "Resend Failed",
          message:
            response.status.message ||
            "Failed to resend OTP. Please try again.",
        });
      }
      setProcessState(false);
    } catch (error) {
      console.error("Resend OTP error:", error);
      setProcessState(false);
      showAlert({
        variant: "error",
        title: "Error",
        message: error.message || "An error occurred while resending OTP.",
      });
    }
  };

  // Timer countdown for resend OTP button
  useEffect(() => {
    let interval;
    if (isButtonDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isButtonDisabled, timer]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white dark:bg-[#0f172a] shadow-lg rounded-lg mx-4 lg:mx-0 p-4 sm:p-16 w-[576px] bg-opacity-80">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            OTP Verification
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
            Enter the OTP sent to your email address.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6">
          {/* OTP Input Fields */}
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-900 dark:text-white"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder="-"
              />
            ))}
          </div>
          {formik.touched.otp && formik.errors.otp && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.otp}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            {processState ? "...." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            disabled={isButtonDisabled}
            className="text-blue-500 hover:underline"
          >
            {isButtonDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
