import axios from "axios";
import {
  changeAccessToken,
  updateUserSuccess,
} from "../../../../redux/slices/userSlice";

export default function refresh(dispatch) {
  axios
    .get("/api/auth/refresh", {
      validateStatus: () => true,
    })
    .then((response) => {
      dispatch(changeAccessToken(response.data));
      axios
        .get("/api/auth/jwt-auth", {
          validateStatus: () => true,
          headers: {
            Authorization: "Bearer " + response.data.accessToken,
          },
        })
        .then((userResponse) => {
          dispatch(updateUserSuccess(userResponse.data));
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
