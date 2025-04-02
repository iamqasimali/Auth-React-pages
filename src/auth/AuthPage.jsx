import { Routes, Route, Navigate } from "react-router-dom";

import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Signup from "./Signup";
import VerifyOtp from "./VerifyOtp";

const AuthPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="login" />} /> 
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="verify-otp" element={<VerifyOtp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AuthPage;