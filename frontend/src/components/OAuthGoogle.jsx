import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuthGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleClick = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((googleResponse) => {
        console.log(googleResponse);
        const userData = {
          username: googleResponse.user.displayName,
          email: googleResponse.user.email,
          avatar: googleResponse.user.photoURL,
        };
        dispatch(signInStart());
        axios
          .post("/api/auth/google", userData, { validateStatus: () => true })
          .then((apiResponse) => {
            if (apiResponse.status == 200) {
              dispatch(signInSuccess(apiResponse.data));
              return navigate("/");
            } else {
              return dispatch(signInFailure(apiResponse.data.message));
            }
          })
          .catch((error) => {
            return dispatch(signInFailure(error));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleClick}
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  );
}
