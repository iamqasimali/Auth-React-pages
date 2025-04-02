import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    email: null,
    name: null,
    surname: null,
    providerId: null,
  });

  // Function to decode JWT and check expiry
  const isTokenExpired = async (token) => {
    if (!token) return true; // No token, consider expired

    // Dynamically import jwt-decode
    // const { default: jwtDecode } = await import("jwt-decode");
    const decoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000; // Current time in seconds

    return decoded.exp < now;
  };

  // This runs when the app first mounts to check auth status
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("authToken");
      const role = Cookies.get("userRole");
      const email = Cookies.get("userEmail");
      const name = Cookies.get("userName");
      const surname = Cookies.get("userSurname");
      const providerId = Cookies.get("userProviderId");

      if (token && !(await isTokenExpired(token)) && role && email && name && surname) {
        setAuth({ token, role, email, name, surname, providerId });
      } else {
        // If token is expired, perform logout
        logout();
      }
    };

    checkAuth();
  }, []); // Empty dependency array means this runs once on mount

  // Periodically check token expiration
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = Cookies.get("authToken");
      if (await isTokenExpired(token)) {
        logout();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const login = (token, role, email, name, surname, providerId) => {
    setAuth({ token, role, email, name, surname });
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("userRole", role, { expires: 7 });
    Cookies.set("userEmail", email, { expires: 7 });
    Cookies.set("userName", name, { expires: 7 });
    Cookies.set("userSurname", surname, { expires: 7 });
    Cookies.set("userProviderId", providerId, { expires: 7 });
  };

  const logout = () => {
    setAuth({ token: null, role: null, email: null, name: null, surname: null });
    Cookies.remove("authToken");
    Cookies.remove("userRole");
    Cookies.remove("userEmail");
    Cookies.remove("userName");
    Cookies.remove("userSurname");
    Cookies.remove("userProviderId");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
