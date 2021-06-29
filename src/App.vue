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
  sockets:{
    connect: function() {
      console.log("socket connected");
    },
    NOTIFY_NC_CLIENT_TO_CANCEL_WORK:function(data){
      console.log(data);
      this.$socket.emit('NOTIFY_NC_CLIENT_TO_CANCEL_WORK_RESPONSE',data);
      this.$router.replace("/");
    },
    NOTIFY_NC_CLIENT_TO_START_WORK:function(data){
      this.$socket.emit('NOTIFY_NC_CLIENT_TO_START_WORK_RESPONSE',data);
      this.$router.replace({
        name: "Operating",
        query: {
          id: data.id,
        },
      });
    },
  }
};
</script>
<style lang="sass">
@import '../node_modules/typeface-roboto/index.css'
@font-face 
  font-family: 'kanit'
  font-style: normal
  font-weight: normal
  src: local('Kanit-Regular'), url('/assets/Kanit/Kanit-Regular.ttf') format('ttf')
*
  font-family: "Roboto" , "kanit", sans-serif, monospace 
  font-weight: 600 !important
.nocopy
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
html
  -ms-overflow-style: none
  scrollbar-width: none
html::-webkit-scrollbar
  display: none
.v-data-table__wrapper
  overflow-x: hidden !important

</style>