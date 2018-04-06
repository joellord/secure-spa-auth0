<template>
  <div>
    <AppNav/>
    Processing authentication response...
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { parseHash } from "../utils/auth";

export default {
  beforeMount() {
    parseHash();
    window.location.href = window.location.origin;
  },
  components: {
    AppNav
  },
  name: "Callback"
};
</script>

<style scoped>
</style>
