import axios from "axios";
import {
  signoutSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";

export default function deleteUser(dispatch, currentUser, accessToken) {
  axios
    .delete(`/api/users/${currentUser.id}`, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        dispatch(signoutSuccess());
      } else {
        return dispatch(changeUserFailure(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(changeUserFailure(error.message));
    });
};
