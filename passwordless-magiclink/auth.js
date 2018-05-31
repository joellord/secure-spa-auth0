const ACCESS_TOKEN = "access_token";
const AUTH_URL = "http://localhost:8080";

let auth = {};

auth.login = () => {
  if (auth.useAuth0) {
    return auth.loginAuth0();
  } else {
    return auth.loginTraditional();
  }
};

auth.logout = () => {
  lock.logout();
  localStorage.removeItem("access_token");
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

var lock = new Auth0LockPasswordless('GKMdfEsnB2gc9kaRln8KVmgHx5dKVZid', 'joel-1.auth0.com', {
  allowedConnections: ['email'],           // Should match the Email connection name, it defaults to 'email'
  passwordlessMethod: 'link',              // If not specified, defaults to 'code'
  auth: {
    redirectUrl: window.location.href,
    responseType: 'token id_token'
  }
});

lock.on('authenticated', function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('access_token', authResult.accessToken);
});


// Uses auth0-js wrapper
auth.loginAuth0 = () => {
  lock.show();
  return Promise.resolve();
};

auth.loginTraditional = () => {
  const userData = UIUpdate.getUsernamePassword();
  const body = {
    email: userData.username,
    callback: window.location.href
  };
  return fetch(AUTH_URL + "/authorize", {method: "POST", body: JSON.stringify(body), headers: {"Content-type": "application/json"}})
      .then((resp) => {
        if (resp.status == 200) {
          UIUpdate.alertBox("Magic Link sent via email");
          return Promise.resolve(resp);
        } else {
          console.log("Something went wrong");
          return Promise.reject(resp);
        }
      });
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