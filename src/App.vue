<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style lang="sass">
@import '../node_modules/typeface-roboto/index.css'
.nocopy
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
</style>
