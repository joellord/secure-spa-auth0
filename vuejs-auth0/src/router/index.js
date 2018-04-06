import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Secret from "@/components/Secret";
import Callback from "@/components/Callback";
import Unauthorized from "@/components/Unauthorized";
import { isLoggedIn } from "../utils/auth";

Vue.use(Router);

function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: "/unauthorized",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/secret",
      name: "Secret",
      beforeEnter: requireAuth,
      component: Secret
    },
    {
      path: "/callback",
      name: "Callback",
      component: Callback
    },
    {
      path: "/unauthorized",
      name: "Unauthorized",
      component: Unauthorized
    }
  ]
});
