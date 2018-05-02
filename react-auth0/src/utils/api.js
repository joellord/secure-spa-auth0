import axios from "axios";
import Auth from "../Auth";

const auth = new Auth();

// const BASE_URL = "http://localhost:8888/";
const BASE_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/clickbaiter-auth0/";

export function getHeadline() {
  return axios.get(`${BASE_URL}headline`);
}

export function getAwesomeHeadline() {
  let headers = {};
  if (auth.isAuthenticated()) {
    headers = {
      Authorization: `Bearer ${auth.getAccessToken()}`
    };
  }
  return axios.get(`${BASE_URL}protected/headline`, { headers });
}
