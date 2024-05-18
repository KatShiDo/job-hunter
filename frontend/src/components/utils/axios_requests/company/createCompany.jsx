import { setCompany } from "../../../../redux/slices/userSlice";
import axios from "axios";
import { isExpired } from "../auth/checkAccessToken";
import refresh from "../auth/refresh";

export default function createCompany(
  dispatch,
  navigate,
  setError,
  formData,
  accessToken
) {
  if (!isExpired(accessToken)) {
    refresh(dispatch);
  }
  axios
    .post("/api/company", formData, {
      validateStatus: () => true,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      if (response.status != 200) {
        return setError(response.message);
      }
      dispatch(setCompany(response.data));
      setError(null);
      navigate("/dashboard?tab=company");
    })
    .catch((error) => {
      setError(error);
    });
}
