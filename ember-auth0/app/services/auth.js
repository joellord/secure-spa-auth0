import Ember from "ember";
import auth0 from "npm:auth0-js";

const AUTH_URL = "http://localhost:8080";
const ACCESS_TOKEN = "access_token";

export default Ember.Service.extend({
  auth: new auth0.WebAuth({
    domain: 'joel-1.auth0.com',
    clientID: 'UF5d0t8oFPhWQLkzkLu192FW9WH8jK0k',
    responseType: 'token id_token',
    audience: 'secure-spa-auth0',
    scope: 'openid profile',
    redirectUri: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname + "callback"
  }),
  useAuth0: true,
  login() {
    if (!this.useAuth0) {
      return this.loginTraditional();
    } else {
      return this.loginAuth0();
    }
  },
  loginTraditional() {
    let callbackURI = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname + "callback";
    return window.location.replace(AUTH_URL + "/login?callback=" + encodeURIComponent(callbackURI));
  },
  loginAuth0() {
    this.get("auth").authorize();
    return Promise.resolve();
  },
  logout() {
    localStorage.removeItem("access_token");
  },
  isLoggedIn() {
    return !!localStorage.getItem(ACCESS_TOKEN);
  },
  parseHash() {
    let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
    let queryParams = {};
    hash.split("&").map(param => {
      param = param.split("=");
      queryParams[param[0]] = param[1];
    });
    if (queryParams.access_token) {
      localStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
      // UIUpdate.loggedIn();
      // UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
    }
    window.location.hash = "";
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
});
