import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import React from "react";

export const PrivateRoute = ({component: Component}: { component: React.FC }) => {
  const {token} = useAuthStore();
  return (
    token == null ? <Component /> : <Navigate to="/login" />
  )
}
