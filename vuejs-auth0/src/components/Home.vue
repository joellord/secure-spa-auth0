<template>
  <div>
    <AppNav/>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <p>Welcome to the headline generator application.  Click on the buttons to get a headline</p>
      </div>
      <div class="col-1"></div>
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <button @click="getHeadline()" class="btn btn-lg btn-primary" id="headline">Get a headline</button>&nbsp;
        <button @click="getAwesomeHeadline()" class="btn btn-lg btn-secondary" id="secret">Awesome headline</button>
      </div>
    </div>

    <div class="row">&nbsp;</div>

    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="alert alert-dark" style="overflow-wrap: break-word">
          <span v-html="headline"></span>
        </div>
      </div>
      <div class="col-2"></div>
    </div>

    <div class="row justify-content-center">
      <div class="col-4 text-center">
        <img :src="imageUrl" id="httpcat" width="350px"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getHeadline, getAwesomeHeadline } from "../utils/api";

const IMAGE_BASE = "http://http.cat/";

export default {
  components: {
    AppNav
  },
  name: "home",
  data() {
    return {
      headline: "Headline goes here",
      imageUrl: `${IMAGE_BASE}200`
    };
  },
  methods: {
    getHeadline() {
      const self = this;
      getHeadline().then(resp => resp.data).then((headline) => {
        self.imageUrl = `${IMAGE_BASE}200`;
        self.headline = headline;
      });
    },
    getAwesomeHeadline() {
      const self = this;
      getAwesomeHeadline().catch(resp => resp.response).then((resp) => {
        self.imageUrl = `${IMAGE_BASE}${resp.status}`;
        return resp.data;
      }).then((headline) => {
        self.headline = headline;
        return headline;
      });
    }
  }
};
</script>

<style scoped>

</style>
