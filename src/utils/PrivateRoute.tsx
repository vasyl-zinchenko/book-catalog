// PrivateRoutes.js

import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PrivateRoutes = () => {
  const { username, } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();


  return username ? <Outlet /> : <Navigate to='/signin' />;
};
