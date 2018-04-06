import Ember from "ember";
import axios from "npm:axios";

const API_URL = "http://localhost:8888";

export default Ember.Service.extend({
  auth: Ember.inject.service("auth"),

  getHeadline() {
    const url = `${API_URL}/headline`;
    return axios.get(url);
  },

  getAwesomeHeadline() {
    const url = `${API_URL}/protected/headline`;
    const headers = {
      "Authorization": `Bearer ${this.get("auth").getAccessToken()}`
    };
    return axios.get(url, {headers});
  }
});
