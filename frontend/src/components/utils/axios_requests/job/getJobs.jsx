import axios from "axios";

export default function getJobs(setJobs, setError, queryParams) {
  let queryString = "?";
  for (var k in queryParams) {
    if (queryParams.hasOwnProperty(k)) {
      queryString += k + "=" + queryParams[k];
    }
  }
  queryString = queryString == "?" ? "" : queryString;
  axios
    .get(`/api/job${queryString}`, {
      validateStatus: () => true,
    })
    .then((response) => {
      if (response.status != 200) {
        return setError(response.message);
      }
      setJobs(response.data);
    })
    .catch((error) => {
      setError(error);
    });
}
