import axios from "axios";
import { isLoggedIn, getAccessToken } from "./auth";

const BASE_URL = "http://localhost:8888/";

export function getHeadline() {
  return axios.get(`${BASE_URL}headline`);
}

export function getAwesomeHeadline() {
  let headers = {};
  if (isLoggedIn()) {
    headers = {
      Authorization: `Bearer ${getAccessToken()}`
    };
  }
  return axios.get(`${BASE_URL}protected/headline`, { headers });
}
