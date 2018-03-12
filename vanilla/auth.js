const ACCESS_TOKEN = "access_token";
const AUTH_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/auth-server-1";
const AUTH_AUTH0_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/clickbaiter-auth0";

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

var webAuth = new auth0.WebAuth({
  domain: 'joel-1.auth0.com',
  clientID: 'NqF5L8KTz1XjZkWjd3ZR6i7qkfjJuCDR',
  responseType: 'token id_token',
  audience: 'https://joel-1.auth0.com/userinfo',
  scope: 'openid',
  redirectUri: window.location.href
});

auth.loginAuth0 = () => {
  webAuth.authorize();
  return Promise.resolve();
};



