let router = {};

router.addRoute = (routes) => {
  router.routes = routes;

  router.routes.push({
    name: "unauthorized",
    isProtected: false
  });

  router.routes.map((r) => {document.querySelector(`#${r.name}Page`).classList.add("d-none")});
  router.defaultView = "main"

  router.navigate();
};

router.navigate = () => {
  let route = window.location.hash.replace("#", "");
  let isLoggedIn = auth.isLoggedIn();

  router.routes.map((r) => {document.querySelector(`#${r.name}Page`).classList.add("d-none")});
  const selectedRoute = router.routes.find((r) => r.name === route);
  let displaySection = router.defaultView + "Page";
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

window.addEventListener("hashchange", router.navigate);
