import React, { createContext, useContext, useState } from 'react';

// Define the context
const AlertContext = createContext();

// Custom hook to use the alert context
export const useAlert = () => {
  return useContext(AlertContext);
};

// AlertProvider component to wrap around the app
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    variant: 'success',
    title: '',
    message: '',
    linkHref: '#',
    linkText: 'Learn more',
  });

  // Function to trigger an alert
  const showAlert = ({ variant, title, message, linkHref, linkText }) => {
    setAlert({
      show: true,
      variant,
      title,
      message,
      linkHref,
      linkText,
    });

    // Hide alert after 3 seconds
    setTimeout(() => {
      hideAlert();
    }, 3000); // 3000 ms = 3 seconds
  };

  // Function to hide the alert
  const hideAlert = () => {
    setAlert({
      ...alert,
      show: false,
    });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
