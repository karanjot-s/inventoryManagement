import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    if (window.confirm("Do you want to logout?"))
      localStorage.removeItem("accessToken");
  });

  return <Navigate to="/login" />;
};

export default Logout;
