// Desc: Reset Password Page
import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

import authDark from "../../assets/image/auth3-dark.webp";
import authLight from "../../assets/image/auth3-light.webp";
import { useTheme } from "../../hooks/useTheme";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPassword = ({ email, flag, setFlag }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`flex justify-center flex-col flex-1 w-full overflow-y-auto no-scrollbar min-h-screen ${
        theme == "dark" ? "dark" : ""
      }`}
      style={{
        backgroundImage: `url(${theme == "dark" ? authDark : authLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="mx-4 sm:mx-auto w-full max-w-md mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <IoChevronBackOutline className="size-5" />
          Back to dashboard
        </Link>
      </div> */}
      <ResetPasswordForm email={email} flag={flag} setFlag={setFlag} />
    </div>
  );
};

export default ResetPassword;
