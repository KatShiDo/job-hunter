import { TextInput, Button, Alert } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import {
  changeUserStart,
  changeUserSuccess,
  changeUserFailure,
} from "../redux/slices/userSlice.js";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
    setUpdateUserSuccess(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(formData).length === 0) {
      return dispatch(changeUserFailure("No changes made"));
    }
    dispatch(changeUserStart());
    axios
      .put(`/api/users/${currentUser.id}`, formData, {
        validateStatus: () => true,
        headers: {
          Authorization: "Bearer " + currentUser.accessToken,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          dispatch(changeUserSuccess(response.data));
          setUpdateUserSuccess("User's profile updated successfully");
        } else {
          return dispatch(changeUserFailure(response.data.message));
        }
      })
      .catch((error) => {
        return dispatch(changeUserFailure(error.message));
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(event.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageFileUploadError(null);
    setUpdateUserSuccess(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
        if (progress == 100) {
          axios
            .put(
              `/api/users/${currentUser.id}`,
              {
                avatar: imageFileUrl,
              },
              {
                validateStatus: () => true,
                headers: {
                  Authorization: "Bearer " + currentUser.accessToken,
                },
              }
            )
            .then((response) => {
              if (response.status == 200) {
                dispatch(changeUserSuccess(response.data));
                setUpdateUserSuccess("User's avatar updated successfully");
              } else {
                return dispatch(changeUserFailure(response.data.message));
              }
            })
            .catch((error) => {
              return dispatch(changeUserFailure(error.message));
            });
        }
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          //   setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={7}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
    </div>
  );
}
