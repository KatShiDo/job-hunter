import axios from "axios";
import {
  changeUserFailure,
  signoutSuccess,
} from "../../../../redux/slices/userSlice";
import { isExpired } from "../auth/checkAccessToken";
import refresh from "../auth/refresh";
import { purgeData } from "../../../../redux/store";

export default function deleteUser(dispatch, currentUser, accessToken) {
  if (!isExpired(accessToken)) {
    refresh(dispatch);
  }
  axios
    .delete(`/api/users/${currentUser.id}`, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        purgeData();
        dispatch(signoutSuccess());
      } else {
        dispatch(changeUserFailure(response.data.message));
      }
    })
    .catch((error) => {
      dispatch(changeUserFailure(error.message));
    });
};
