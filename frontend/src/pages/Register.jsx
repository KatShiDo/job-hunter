import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoLarge from "../components/LogoLarge";
import InputElement from "../components/InputElement";
import SubmitButton from "../components/SubmitButton";
import OAuthGoogle from "../components/OAuthGoogle";

export default function Register() {
  const [formData, setFormData] = useState({});
  const { error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    dispatch(signInStart());
    axios
      .post("/api/auth/register", formData, { validateStatus: () => true })
      .then((response) => {
        if (response.status == 200) {
          dispatch(signInSuccess(response.data));
          navigate("/");
        } else {
          return dispatch(signInFailure(response.data.message));
        }
        return response.json();
      })
      .catch((error) => {
        return dispatch(signInFailure(error.message));
      });
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <LogoLarge />
          <p className="text-sm mt-5">
            This is Job Hunter. You can sign up with your email and password or
            with Google.
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
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            >
              Your email
            </InputElement>
            <InputElement
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            >
              Your password
            </InputElement>
            <SubmitButton>Sign Up</SubmitButton>
            <OAuthGoogle />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
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
