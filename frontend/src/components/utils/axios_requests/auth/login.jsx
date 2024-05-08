import axios from "axios";
import {
  authUserSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";

export default function login(dispatch, navigate, formData) {
  axios
    .post("/api/auth/login", formData, { validateStatus: () => true })
    .then((response) => {
      if (response.status == 200) {
        dispatch(authUserSuccess(response.data));
        return navigate("/");
      } else {
        return dispatch(changeUserFailure(response.data.message));
      }
    })
    .catch((error) => {
      return dispatch(changeUserFailure(error.message));
    });
};
