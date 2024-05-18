import axios from "axios";
import { isExpired } from "../auth/checkAccessToken";
import refresh from "../auth/refresh";

export default function create(dispatch, navigate, setError, formData, accessToken) {
  if (!isExpired(accessToken)) {
    refresh(dispatch);
  }
  axios
    .post("/api/job", formData, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status != 200) {
        return setError(response.message);
      }
      setError(null);
      navigate("/dashboard?tab=company");
    })
    .catch((error) => {
      setError(error);
    });
}
