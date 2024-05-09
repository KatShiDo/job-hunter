import axios from "axios";
import {
  signoutSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";
import { isExpired } from "./checkAccessToken";
import refresh from "./refresh";

export default function logout(dispatch, accessToken) {
  if (isExpired(accessToken)) {
    refresh(dispatch);
  }
  axios
    .post("api/auth/logout", {
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
}
