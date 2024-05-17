import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function HasCompanyRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser != null && currentUser.company ? <Outlet /> : <Navigate to="/company/create" />;
}
