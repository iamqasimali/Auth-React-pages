import httpService from "../httpService";

export const signin = async (data) => {
  try {
    const response = await httpService("POST", "/login", "", data);

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(response.message || "An error occurred during login.");
    }

    return { data: response.data, headers: response.headers }; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Login failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(error.message || "Login failed. Please try again.");
  }
};

export const signup = async (data) => {
  try {
    const response = await httpService("POST", "/signup", "", data);

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(response.message || "An error occurred during signup.");
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Signup failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(error.message || "Signup failed. Please try again.");
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await httpService(
      "GET",
      "/api/v1/users/verify_otp",
      "",
      data
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during verifying OTP."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Verify OTP failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(error.message || "Verify OTP failed. Please try again.");
  }
};

export const resendOtp = async (data) => {
  try {
    const response = await httpService(
      "GET",
      "/api/v1/users/resend_otp",
      "",
      data
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during verifying OTP."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Verify OTP failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(error.message || "Verify OTP failed. Please try again.");
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await httpService(
      "POST",
      "/api/v1/users/reset_password",
      "",
      data
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during reset password."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Reset password failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(
      error.message || "Reset password failed. Please try again."
    );
  }
};
