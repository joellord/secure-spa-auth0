import Ember from "ember";

const IMAGE_BASE = "http://http.cat/";

export default Ember.Controller.extend({
  api: Ember.inject.service("headlineapi"),
  headline: "Headline goes here",
  imageUrl: "http://http.cat/200",
  actions: {
    getHeadline() {
      this.get("api").getHeadline().then(resp => {
        this.set("imageUrl", `${IMAGE_BASE}${resp.status}`);
        return resp.data;
      }).then(headline => {
        this.set("headline", headline);
      });
    },
    getAwesomeHeadline() {
      let status = 0;
      this.get("api").getAwesomeHeadline().catch(resp => {
        return resp.response;
      }).then(resp => {
        this.set("imageUrl", `${IMAGE_BASE}${resp.status}`);
        return resp.data
      }).then(headline => {
        this.set("headline", headline);
      })
    }
  }
});
