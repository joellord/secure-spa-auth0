import Ember from "ember";

export default Ember.Component.extend({
  auth: Ember.inject.service("auth"),
  init() {
    this._super(...arguments);
    this.set("loggedIn", this.get("auth").isLoggedIn());
  },
  loggedIn() {
    this.get("auth").isLoggedIn();
  },
  actions: {
    login() {
      this.get("auth").login();
    },
    logout() {
      this.get("auth").logout();
      this.set("loggedIn", false);
    }
  }
});
