import axios from "axios";
import {
  changeUserFailure,
  setSuccessMessage,
  updateUserSuccess,
} from "../../../../redux/slices/userSlice";
import { isExpired } from "../auth/checkAccessToken";
import refresh from "../auth/refresh";

export default function updateUser(dispatch, currentUser, accessToken, formData) {
  if (isExpired(accessToken)) {
    refresh(dispatch);
  }
  axios
    .put(`/api/users/${currentUser.id}`, formData, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        dispatch(updateUserSuccess(response.data));
        dispatch(setSuccessMessage("User's profile updated successfully"));
      } else {
        return dispatch(changeUserFailure(response.data.message));
      }
    })
    .catch((error) => {
      return dispatch(changeUserFailure(error.message));
    });
};
