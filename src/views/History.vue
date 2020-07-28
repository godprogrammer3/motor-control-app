<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-app-bar-nav-icon style="color:white" @click="drawer = true">
        <v-icon large>
          menu
        </v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title style="color:white" class="text-h4"
        >ประวัติการดำเนินงาน</v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="$router.replace({ path: '/' })">
            <v-list-item-icon>
              <v-icon>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title>แผนการดำเนินงาน</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ประวัติ</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('setting')">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <HistoryJobList></HistoryJobList>
  </div>
</template>

<script>
import HistoryJobList from "@/components/HistoryJobList.vue";
export default {
  components: {
    HistoryJobList,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style></style>
