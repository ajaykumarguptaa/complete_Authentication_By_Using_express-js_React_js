import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "../components/Pages/SignUpPage";
import Home from "../components/Pages/Home";
import LoginPage from "../components/Pages/LoginPage";
import Dashboard from "../components/Pages/Deshboard";
import {RefreshHandler} from "../components/Pages/RefreshHandler";

const AppRoutes = () => {
  // private route
  // Replace with your actual authentication logic or context
  // const isAuthenticated = !!localStorage.getItem("token");
  // const isAuthenticated = localStorage.getItem("token") ? true : false;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const checkAuthentication = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // };
  // bekar upper


  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  return (
    <>
      {/* private routing */}

        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } /* private routing */
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
