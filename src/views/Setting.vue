<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-app-bar-nav-icon
        style="color:white"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="color:white">ตั้งค่า</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="$router.replace({ path: '/' })">
            <v-list-item-icon>
              <v-icon>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title>รายการงาน</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('history')">
            <v-list-item-icon>
              <v-icon>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ประวัติ</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <SettingBody :onTop="onTop" :slowModeVelocity="slowModeVelocity"></SettingBody>
  </div>
</template>

<script>
import SettingBody from "@/components/SettingBody.vue";
export default {
  components: {
    SettingBody,
  },
  data() {
    return {
      drawer: false,
      onTop: 123,
      slowModeVelocity: 555,

    };
  },

};
</script>

<style></style>
