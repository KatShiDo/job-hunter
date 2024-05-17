import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cvs() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (currentUser.company) {
    navigate("/company");
  }
  return <div>Cvs</div>;
}
