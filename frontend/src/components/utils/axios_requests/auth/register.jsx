import axios from "axios";
import {
  authUserSuccess,
  changeUserFailure,
} from "../../../../redux/slices/userSlice";

export default function register(dispatch, navigate, formData) {
  console.log(formData);
  axios
    .post("/api/auth/register", formData, { validateStatus: () => true })
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
