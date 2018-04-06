const ACCESS_TOKEN = "access_token";

let auth = {};
auth.useAuth0 = true;

auth.login = () => {
  return auth.loginAuth0();
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
  // webAuth.authorize();
  lock.show();
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
  if (queryParams.access_token && queryParams.expires_in) {
    localStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
    UIUpdate.loggedIn();
    UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
  }
  // window.location.hash = "";
};

window.addEventListener("DOMContentLoaded", auth.parseHash);