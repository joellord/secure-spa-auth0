const ACCESS_TOKEN = "access_token";
// const AUTH_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/auth-server-with-login";
const AUTH_URL = "http://localhost:8080";

let auth = {};

auth.login = () => {
  if (!auth.useAuth0) {
    return auth.loginTraditional();
  } else {
    return auth.loginAuth0();
  }
};

auth.logout = () => {
  localStorage.removeItem("access_token");
};

// loginTradition sends a POST request to the auth server
auth.loginTraditional = () => {
  let callbackURI = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname;
  return window.location.replace(AUTH_URL + "/login?callback=" + encodeURIComponent(callbackURI));
};

// isLoggedIn return true if we have a token in localstorage
auth.isLoggedIn = () => {
  return !!localStorage.getItem(ACCESS_TOKEN);
};

// Connection details for Auth0 - Copy & pasted from the quick start
let webAuth = new auth0.WebAuth({
  domain: 'joel-1.auth0.com',
  clientID: 'UF5d0t8oFPhWQLkzkLu192FW9WH8jK0k',
  responseType: 'token id_token',
  audience: 'secure-spa-auth0',
  scope: 'openid profile',
  redirectUri: window.location.href
});

// Uses auth0-js wrapper
auth.loginAuth0 = () => {
  webAuth.authorize();
  return Promise.resolve();
};

// Parses the hash info on redirect and extracts the
auth.parseHash = () => {
  let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
  let queryParams = {};
  hash.split("&").map(param => {
    param = param.split("=");
    queryParams[param[0]] = param[1];
  });
  if (queryParams.access_token) {
    localStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
    UIUpdate.loggedIn();
    UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
  }
  window.location.hash = "";
};

window.addEventListener("DOMContentLoaded", auth.parseHash);