<template>
  <v-card style="overflow:hidden;">
    <v-app-bar color="indigo darken-4" style="height: 70px" flat>
      <v-toolbar-title style="color: white" class="text-h4"
        >แผนการดำเนินงาน</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <span style="margin: 20px; color: white" class="text-h5">{{
        datenow
      }}</span>
      <v-btn class="mx-2" medium dark fab color="red darken-2" @click="close">
        <v-icon x-large dark>close</v-icon>
      </v-btn>
    </v-app-bar>
    <HomeJobList
      @handle-event="handleEvent"
      :isJobRunning="true"
      v-if="mode == 'home'"
    ></HomeJobList>
    <HomeJobListManage
      :isJobRunning="true"
      @handle-event="handleEvent"
      v-else-if="mode == 'home_manage_group'"
    ></HomeJobListManage
  ></v-card>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import HomeJobList from "@/components/HomeJobList.vue";
import { mapActions } from "vuex";
import HomeJobListManage from "@/components/HomeJobListManage.vue";

export default {
  components: {
    HomeJobList,
    HomeJobListManage,
  },
  data() {
    return {
      isDialogShow: false,
      datenow: moment().format("DD/M/YYYY"),
      date: new Date().toISOString().substr(0, 10),
      mode: "home",
    };
  },
  methods: {
    handleEvent(data) {
      if (data.type === "change_mode") {
        this.mode = data.value;
      }
    },
    dateUpdate() {
      this.datenow = moment().format("DD/M/YYYY");
    },
    close() {
      this.$emit("popup-event", { type: "popup-home", value: "close" });
    },
  },
  mounted() {
    this.interval = setInterval(this.dateUpdate, 1800000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="css">
.v-dialog {
  box-shadow: none !important;
  overflow-y: hidden !important;
}
</style>
