let router = {};

router.addRoute = (routes) => {
  router.routes = routes;

  router.routes.push({
    name: "unauthorized",
    isProtected: false
  });

  router.routes.map((r) => {document.querySelector(`#${r.name}Page`).classList.add("d-none")});
  router.defaultView = "main";

  router.navigate();
};

// Event handler when the hash changess
router.navigate = () => {
  let route = window.location.hash.replace("#", "");
  let isLoggedIn = auth.isLoggedIn();

  router.routes.map((r) => {document.querySelector(`#${r.name}Page`).classList.add("d-none")});
  const selectedRoute = router.routes.find((r) => r.name === route);
  let displaySection = router.defaultView + "Page";
  // Checking if the route is protected of not
  if (selectedRoute && selectedRoute.isProtected) {
    if (isLoggedIn) {
      displaySection = selectedRoute.name + "Page";
    } else {
      displaySection = "unauthorizedPage";
    }
  }
  if (selectedRoute && !selectedRoute.isProtected) {
    displaySection = selectedRoute.name + "Page";
  }
  document.querySelector("#" + displaySection).classList.remove("d-none");
};

//Add all the routes
router.addRoute([{
  name: "main",
  isProtected: false
}, {
  name: "secret",
  isProtected: true
}]);

window.addEventListener("hashchange", router.navigate);
