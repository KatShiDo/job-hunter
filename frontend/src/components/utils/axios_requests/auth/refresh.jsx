import axios from "axios";
import {
  changeAccessToken,
  unsetSuccessMessage,
  updateUserSuccess,
} from "../../../../redux/slices/userSlice";

export default function refresh(dispatch) {
  axios
    .get("/api/auth/refresh", {
      validateStatus: () => true,
    })
    .then((response) => {
      console.log("RESPONSE FROM REFRESH", response);
      if (response.status == 200) {
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
            dispatch(unsetSuccessMessage());
          });
      } else {
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
