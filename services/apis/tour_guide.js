import httpService from "../httpService";

export const tourGuideProfile = async (token) => {
  try {
    const response = await httpService(
      "GET",
      "/api/v1/tour_guides/tour_guide_profile",
      token,
      ""
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during fetching tourguide."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Fetching TourGuide failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(
      error.message || "Fetching TourGuide failed. Please try again."
    );
  }
};

export const tourGuideList = async (params) => {
  try {
    const response = await httpService(
      "GET",
      "/api/v1/tour_guides",
      "",
      params
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during fetching tourguide."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Fetching TourGuide failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(
      error.message || "Fetching TourGuide failed. Please try again."
    );
  }
};

export const tourGuideDetails = async (id) => {
  try {
    const response = await httpService(
      "GET",
      `/api/v1/tour_guides/${id}`,
      "",
      ""
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during fetching tourguide."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Fetching TourGuide failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(
      error.message || "Fetching TourGuide failed. Please try again."
    );
  }
};

export const similarTourGuides = async () => {
  try {
    const response = await httpService(
      "GET",
      `/api/v1/tour_guides/similar_tour_guide`,
      "",
      ""
    );

    // If the response contains an error message, throw a custom error
    if (response.status !== 200) {
      throw new Error(
        response.message || "An error occurred during fetching tourguide."
      );
    }

    return response.data; // Return the actual data from the response
  } catch (error) {
    // Handle the error response, if it's a structured error
    console.error(`Fetching TourGuide failed: ${error.message || error}`);

    // You can decide to throw the error again or return the structured error message
    throw new Error(
      error.message || "Fetching TourGuide failed. Please try again."
    );
  }
};
