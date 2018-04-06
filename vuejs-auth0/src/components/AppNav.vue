<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Secure your SPA</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" data-route="#">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" data-route="#secret">
          <router-link to="/secret" class="nav-link">Secret Area</router-link>
        </li>
      </ul>
      <form class="form-inline">
        <button
          v-show="isLoggedIn()"
          @click="handleLogout()"
          class="btn btn-outline-danger" type="button" id="logoutBtn">Logout</button>
        <button
          v-show="!isLoggedIn()"
          @click="handleLogin()"
          class="btn btn-outline-success my-2 my-sm-0" type="button" id="loginBtn">Login</button>&nbsp;
      </form>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from "../utils/auth";

export default {
  name: "AppNav",
  methods: {
    handleLogin() {
      return login();
    },
    handleLogout() {
      return logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    }
  }
};
</script>

<style scoped>

</style>
