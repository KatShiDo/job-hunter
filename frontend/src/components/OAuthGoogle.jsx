import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { changeUserStart, changeUserFailure } from "../redux/slices/userSlice";
import { getFingerprint } from "./utils/getFingerprint.js";
import google from "./utils/axios_requests/auth/google";
import { useNavigate } from "react-router-dom";

export default function OAuthGoogle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const fingerprint = await getFingerprint();
      const userData = {
        username: googleResponse.user.displayName,
        email: googleResponse.user.email,
        avatar: googleResponse.user.photoURL,
        fingerprint: fingerprint,
      };
      dispatch(changeUserStart());
      google(dispatch, navigate, userData);
    } catch (error) {
      dispatch(changeUserFailure(error.message));
    }
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
