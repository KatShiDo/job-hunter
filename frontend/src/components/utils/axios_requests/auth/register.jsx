import axios from "axios";
import {
  authUserSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";

export default function register(dispatch, navigate, formData) {
  axios
    .post("/api/auth/register", formData, { validateStatus: () => true })
    .then((response) => {
      if (response.status == 200) {
        dispatch(authUserSuccess(response.data));
        navigate("/");
      } else {
        return dispatch(changeUserFailure(response.data.message));
      }
      return response.json();
    })
    .catch((error) => {
      return dispatch(changeUserFailure(error.message));
    });
};
