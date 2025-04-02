import ForgotPassword from "@/components/companion-auth/ForgotPassword";
import Login from "@/components/companion-auth/Login";
import ResetPassword from "@/components/companion-auth/ResetPassword";
import Signup from "@/components/companion-auth/Signup";
import { Routes, Route, Navigate } from "react-router-dom";


const AuthPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="login" />} /> 
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AuthPage;
