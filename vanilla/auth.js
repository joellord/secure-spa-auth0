const ACCESS_TOKEN = "access_token";
const AUTH_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/auth-server-1";

let auth = {};
auth.useAuth0 = false;

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

auth.isLoggedIn = () => {
  return !!localStorage.getItem(ACCESS_TOKEN);
};

auth.loginTraditional = () => {
  return fetcher(AUTH_URL + "/login", {method: "POST"})
      .then((body) => {
        try {
          let resp = JSON.parse(body);
          localStorage.setItem("access_token", resp.token);
          return Promise.resolve(resp);
        } catch(e) {
          console.log(e);
          UIUpdate.alertBox(body);
          return Promise.reject(body);
        }
      });
};

let webAuth = new auth0.WebAuth({
  domain: 'joel-1.auth0.com',
  clientID: 'UF5d0t8oFPhWQLkzkLu192FW9WH8jK0k',
  responseType: 'token id_token',
  audience: 'secure-spa-auth0',
  scope: 'openid profile',
  redirectUri: window.location.href
});

auth.loginAuth0 = () => {
  webAuth.authorize();
  return Promise.resolve();
};

auth.parseHash = () => {
  let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
  let queryParams = {};
  hash.split("&").map(param => {
    param = param.split("=");
    queryParams[param[0]] = param[1];
  });
  if (queryParams.access_token && queryParams.expires_in) {
    localStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
    UIUpdate.loggedIn();
    UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
  }
  window.location.hash = "";
};

window.addEventListener("DOMContentLoaded", auth.parseHash);