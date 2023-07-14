import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PrivateRoutes = () => {
  const { username } = useContext(UserContext);

  return username ? <Outlet /> : <Navigate to='/signin' />;
};
