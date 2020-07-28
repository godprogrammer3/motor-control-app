<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-app-bar-nav-icon style="color:white;" @click="drawer = true">
        <v-icon large>
          menu
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title style="color:white;" class="text-h4"
        >แผนการดำเนินงาน</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-card color="indigo darken-1" :date="datenow" style="padding:5px;">
        <span style="margin:20px;color:white;" class="text-h5">{{
          datenow
        }}</span>
        <v-icon large color="white">date_range</v-icon>
      </v-card>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title>แผนการดำเนินงาน</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('history')">
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
    <HomeJobList @show-dialog="showDialog"></HomeJobList>
    <v-btn
      color="indigo"
      dark
      absolute
      x-large
      bottom
      :style="{ left: '50%', transform: 'translateX(-50%)', fontSize: '1.3em' }"
      @click="showCreateDialog"
    >
      <v-icon large>control_point</v-icon>เพิ่มงาน
    </v-btn>
    <v-dialog v-model="isDialogShow" max-width="290">
      <v-card v-if="dialogInfo.type === 'delete'">
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text class="text-center"
              >ต้องการ "ลบ" งาน 20050384</v-card-text
            >
            <v-card-text class="text-center mt-0">ใช่หรือไม่</v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isDialogShow = false">ไม่</v-btn>

          <v-btn color="green darken-1" @click="deleteJobAction">ใช่</v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        v-else-if="dialogInfo.type === 'edit' || dialogInfo.type === 'create'"
      >
        <v-card class="pa-5" elevation="0">
          <v-text-field
            id="workNo"
            label="หมายเลขงาน"
            v-model:value="workNo"
            @focus="input = 'workNo'"
          ></v-text-field>
          <v-text-field
            id="length"
            label="ความยาว"
            v-model:value="length"
            suffix="เมตร"
            @focus="input = 'length'"
          ></v-text-field>
          <v-text-field
            v-model="date"
            label="วันที่ดำเนินงาน"
            prepend-icon="event"
            readonly
            @click="isDatePickerShow = true"
          ></v-text-field>
          <v-dialog v-model="isDatePickerShow">
            <v-date-picker v-model:value="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="isDatePickerShow = false"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1 white--text" @click="isDialogShow = false"
            >ยกเลิก</v-btn
          >

          <v-btn
            color="green darken-1 white--text"
            @click="
              dialogInfo.type === 'create' ? createJobAction() : editJobAction()
            "
            >บันทึก</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-else-if="dialogInfo.type === 'operate'">
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text class="text-center"
              >ต้องการ "เริ่ม" งาน 20050384</v-card-text
            >
            <v-card-text class="text-center mt-0">ใช่หรือไม่</v-card-text>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isDialogShow = false">ไม่</v-btn>

          <v-btn color="green darken-1" @click="$router.replace('/operating')"
            >ใช่</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-footer v-show="input !== ''" fixed>
        <TouchKeyboard @key-press="keyPress"></TouchKeyboard>
      </v-footer>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import HomeJobList from "@/components/HomeJobList.vue";
import Setting from "@/views/Setting.vue";
import TouchKeyboard from "../components/TouchKeyboard.vue";
import { mapActions } from "vuex";
export default {
  components: {
    HomeJobList,
    TouchKeyboard,
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
    };
  },
  methods: {
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
      await this.editJob({
        jobId: this.workNo,
        length: this.length,
        workTime: this.date,
        oldJobId: this.dialogInfo.item.oldWorkNo,
      });
      this.isDialogShow = false;
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
    ...mapActions(["deleteJob", "createJob", "editJob"]),
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
