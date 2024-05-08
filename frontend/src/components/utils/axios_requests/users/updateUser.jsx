import axios from "axios";
import {
  changeUserFailure,
  authUserSuccess,
  setSuccessMessage,
} from "../../../../redux/slices/userSlice";

export default function updateUser(dispatch, currentUser, accessToken, formData) {
  axios
    .put(`/api/users/${currentUser.id}`, formData, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        dispatch(authUserSuccess(response.data));
        dispatch(setSuccessMessage("User's profile updated successfully"));
      } else {
        return dispatch(changeUserFailure(response.data.message));
      }
    })
    .catch((error) => {
      return dispatch(changeUserFailure(error.message));
    });
};
