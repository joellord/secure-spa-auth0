const API_URL = "http://localhost:8888";
const API_AUTH0_URL = "http://localhost:8887";

//Reset token
localStorage.removeItem("access_token");

auth.useAuth0 = true;
let serverUrl = auth.useAuth0 ? API_AUTH0_URL : API_URL;

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
  fetcher(serverUrl + "/headline");
});

secretBtn.addEventListener("click", (event) => {
  fetcher(serverUrl + "/protected/headline");
});

logoutBtn.addEventListener("click", (event) => {
  auth.logout();
  UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
  auth.login().then(() => UIUpdate.loggedIn());
});

//Set the initial cat (in case we're offline)
UIUpdate.updateCat(200);
