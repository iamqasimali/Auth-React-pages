import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

import authDark from "../../assets/image/auth3-dark.webp";
import authLight from "../../assets/image/auth3-light.webp";
import { useTheme } from "../../hooks/useTheme";
import LoginForm from "@/components/auth/LoginForm";
import { useAlert } from "@/context/AlertContext";
import Alert from "@/widgets/alerts/Alert";


const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const { alert, hideAlert } = useAlert();
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
      {alert.show && (
        <Alert
          variant={alert.variant}
          title={alert.title}
          message={alert.message}
          showLink={true}
          linkHref={alert.linkHref}
          linkText={alert.linkText}
        />
      )}
      <LoginForm />
    </div>
  );
};

export default Login;
