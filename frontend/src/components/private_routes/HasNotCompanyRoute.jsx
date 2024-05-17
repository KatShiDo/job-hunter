import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function HasNotCompanyRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && !currentUser.company ? <Outlet /> : <Navigate to="/dashboard?tab=company" />;
}