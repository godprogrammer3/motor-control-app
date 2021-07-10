<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height: 70px" flat>
      <v-app-bar-nav-icon style="color: white" @click="drawer = true">
        <v-icon large> menu </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title style="color: white" class="text-h4"
        >แผนการดำเนินงาน</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <span style="margin: 20px; color: white" class="text-h5">{{
        datenow
      }}</span>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary width="30vw">
      <v-list nav>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon large>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6"
              >แผนการดำเนินงาน</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="$router.replace('history')">
            <v-list-item-icon>
              <v-icon large> history</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ประวัติ</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('setting')">
            <v-list-item-icon>
              <v-icon large>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" class="white--text text-h6">
           ปิดเครื่อง
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <HomeJobList
      @handle-event="handleEvent"
      v-if="mode == 'home'"
    ></HomeJobList>
    <HomeJobListManage
      @handle-event="handleEvent"
      v-else-if="mode == 'home_manage_group'"
    ></HomeJobListManage>
  </div>
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
      dialogInfo: {},
      datenow: moment().format("DD/M/YYYY"),
      date: new Date().toISOString().substr(0, 10),
      lists: [],
      drawer: false,
      input: "",
      workNo: "",
      length: "",
      isDatePickerShow: false,
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
    showDialog(data) {
      this.isDialogShow = true;
      this.dialogInfo = data;
      if (this.dialogInfo.type === "edit") {
        this.workNo = this.dialogInfo.item.workNo;
        this.length = this.dialogInfo.item.length;
        this.dialogInfo.item.oldWorkNo = this.dialogInfo.item.workNo;
        this.date = this.dialogInfo.item.workDate;
      } else {
        this.workNo = this.dialogInfo.item.workNo;
        this.length = this.dialogInfo.item.length;
      }
    },
    keyPress(key) {
      if (key === "close") {
        this.input = "";
      } else if (key === "del") {
        if (this.input === "workNo") {
          this.workNo = this.workNo.slice(0, -1);
        } else {
          this.length = parseInt(this.length.toString().slice(0, -1));
          if (isNaN(this.length)) {
            this.length = "";
          }
        }
      } else {
        if (this.input === "workNo") {
          this.workNo += key;
        } else {
          this.length += key;
        }
      }
    },
    async deleteJobAction() {
      await this.deleteJob(this.dialogInfo.item.workNo);
      this.isDialogShow = false;
    },
    async editJobAction() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (!this.formHasErrors) {
        await this.editJob({
          jobId: this.workNo,
          length: this.length,
          workTime: this.date,
          oldJobId: this.dialogInfo.item.oldWorkNo,
        });
        this.isDialogShow = false;
      }
    },
    async createJobAction() {
      await this.createJob({
        jobId: this.workNo,
        length: this.length,
        workTime: this.date,
      });
      this.isDialogShow = false;
    },
    showCreateDialog() {
      this.dialogInfo.type = "create";
      this.workNo = "";
      this.length = 0;
      this.date = new Date().toISOString().substr(0, 10);
      this.isDialogShow = true;
    },
    beginWork() {
      this.startWork();
      this.$router.replace(
        "/operating?workNo=" + this.workNo + "&length=" + this.length
      );
    },
    ...mapActions(["deleteJob", "createJob", "editJob", "startWork"]),
  },
  computed: {
    form() {
      return {
        workNo: this.workNo,
        length: this.length,
      };
    },
  },
  mounted() {
    this.interval = setInterval(this.dateUpdate, 1800000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  watch: {
    isDialogShow(newValue, oldValue) {
      this.input = "";
    },
  },
};
</script>
<style lang="css">
</style>
