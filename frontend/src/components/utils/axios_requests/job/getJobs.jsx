import axios from "axios";

export default function getJobs(setJobs, setError, setShowMore, queryParams) {
  let queryString = "?";
  for (var k in queryParams) {
    if (queryParams.hasOwnProperty(k)) {
      queryString += k + "=" + queryParams[k] + "&";
    }
  }
  queryString = queryString.substring(0, queryString.length - 1);
  axios
    .get(`/api/job${queryString}`, {
      validateStatus: () => true,
    })
    .then((response) => {
      if (response.status != 200) {
        return setError(response.message);
      }
      if (response.data.length < 10) {
        setShowMore(false);
      }
      setJobs(response.data);
    })
    .catch((error) => {
      setError(error);
    });
}
