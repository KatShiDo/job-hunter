import axios from "axios";
import {
  authUserSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";

export default function google(dispatch, navigate, userData) {
  axios
    .post("/api/auth/google", userData, {
      validateStatus: () => true,
    })
    .then((apiResponse) => {
      if (apiResponse.status == 200) {
        dispatch(authUserSuccess(apiResponse.data));
        return navigate("/");
      } else {
        return dispatch(changeUserFailure(apiResponse.data.message));
      }
    });
}
