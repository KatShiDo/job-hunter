import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserStart,
  changeUserFailure,
} from "../redux/slices/userSlice";
import LogoLarge from "../components/LogoLarge";
import InputElement from "../components/InputElement";
import SubmitButton from "../components/SubmitButton";
import OAuthGoogle from "../components/OAuthGoogle";
import login from "../components/utils/axios_requests/auth/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: null, password: null });
  const { error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(changeUserFailure("Please fill out all fields"));
    }
    dispatch(changeUserStart());
    login(dispatch, navigate, formData);
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <LogoLarge />
          <p className="text-sm mt-5">
            This is Job Hunter. You can sign in with your username and password.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputElement
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
            >
              Your username
            </InputElement>
            <InputElement
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            >
              Your password
            </InputElement>
            <SubmitButton>Sign In</SubmitButton>
            <OAuthGoogle />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
