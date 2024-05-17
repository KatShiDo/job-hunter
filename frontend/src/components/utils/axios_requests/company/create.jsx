import { setCompany } from "../../../../redux/slices/userSlice";
import axios from "axios";

export default function create(dispatch, navigate, setError, formData, accessToken) {
  axios
    .post("/api/company/create", formData, {
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
};
