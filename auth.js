// import jwtDecode from 'jwt-decode'

const CLIENT_ID = 'bF0pOfxIS9nG4GbXWXVN4lsDTqm5WB0s';
const CLIENT_DOMAIN = 'joel-1.auth0.com';
const REDIRECT = 'http://localhost:5000/vanilla-routing-auth0.html';
const SCOPE = 'full_access';
const AUDIENCE = 'secure-spa-auth0';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE,
    language: "fr"
  })
}

function parseHash() {
  setAccessToken();
  window.location.hash = "";
}

function logout () {
  clearIdToken();
  clearAccessToken();
}

function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1]).replace(/\+/g, ' ')
}

function setAccessToken () {
  debugger;
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  debugger;
  // const token = jwtDecode(encodedToken)
  const token = encodedToken.split(".");
  const payload = JSON.parse(btoa(token[1]));
  if (!payload.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(payload.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
