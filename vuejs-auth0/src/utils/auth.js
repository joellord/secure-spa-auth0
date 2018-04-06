import auth0 from "auth0-js";

const AUTH_URL = "http://localhost:8080";
const ACCESS_TOKEN = "access_token";

const useAuth0 = false;

const webAuth = new auth0.WebAuth({
  domain: "joel-1.auth0.com",
  clientID: "UF5d0t8oFPhWQLkzkLu192FW9WH8jK0k",
  responseType: "token id_token",
  audience: "secure-spa-auth0",
  scope: "openid profile",
  redirectUri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}callback`
});

function loginTraditional() {
  const callbackURI = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname}callback`;
  return window.location.replace(`${AUTH_URL}/login?callback=${encodeURIComponent(callbackURI)}`);
}

function loginAuth0() {
  webAuth.authorize();
  return Promise.resolve();
}

export function login() {
  if (!useAuth0) return loginTraditional();
  return loginAuth0();
}

export function logout() {
  localStorage.removeItem("access_token");
}

export function isLoggedIn() {
  return !!localStorage.getItem(ACCESS_TOKEN);
}

export function parseHash() {
  const hash = window.location.hash.substr(0, 1) === "#" ? window.location.hash.substr(1) : window.location.hash;
  const queryParams = {};
  hash.split("&").map((param) => {
    param = param.split("=");
    queryParams[param[0]] = param[1];
    return true;
  });
  if (queryParams.access_token) {
    localStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
    // UIUpdate.loggedIn();
    // UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
