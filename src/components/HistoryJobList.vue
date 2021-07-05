<template>
  <v-container fluid class="pa-0">
    <v-row
      class="elevation-0 pl-10 ma-0"
      style="background-color:white;"
      align="center"
      justify="center"
    >
      <span class="text-h4">เริ่ม :</span>
      <v-btn
        style="width:auto;height:auto;"
        class="ma-2 pl-6 pr-6 pt-4 pb-4 white--text"
        color="indigo"
        @click="setStartDate()"
        ><v-row align="center" justify="center">
          <v-icon x-large>date_range</v-icon
          ><span class="text-h5">{{ startDateShow }}</span></v-row
        ></v-btn
      >
      <span class="text-h4">สิ้นสุด :</span>
      <v-btn
        style="width:auto;height:auto;"
        class="ma-2 pl-6 pr-6 pt-4 pb-4 white--text"
        color="indigo"
        @click="setEndDate()"
        ><v-row align="center" justify="center"
          ><v-icon x-large>date_range</v-icon
          ><span class="text-h5">{{ endDateShow }}</span></v-row
        ></v-btn
      >
      <v-btn
        class="text-h4 white--text px-10 ml-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="getHistory()"
      >
        ค้นหา
      </v-btn>
      <v-btn
        class="text-h4 white--text px-10 ml-5"
        style="height:auto;width:auto;"
        color="indigo"
        @click="exportData()"
      >
        นำออก
      </v-btn>
    </v-row>
    <v-row
      class="elevation-2 pl-10 ma-0"
      style="background-color:white;padding-left:3vw;padding-right:7vw;"
    >
      <v-col align="center" justify="center"><span>ลำดับ</span></v-col>
      <v-col align="center" justify="center"><span>หมายเลขงาน</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวงาน</span></v-col>
      <v-col align="center" justify="center"><span>เพิ่ม/ลด</span></v-col>
      <v-col align="center" justify="center"><span>ทั้งหมด</span></v-col>
      <v-col align="center" justify="center"
        ><span>วันที่ดำเนินงาน</span></v-col
      >
      <v-col align="center" justify="center"><span>รายละเอียด</span></v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-list class="mt-3 list-class" :style="{ height: '60vh' }">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-card width="100%" class="mb-5 rounded-xl">
            <v-toolbar
              :color="item.is_continue ? 'indigo' : 'orange'"
              height="95"
            >
              <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                >กลุ่มหมายเลข {{ item.id }}</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn
                v-if="isJobRunning != true"
                large
                fab
                dark
                color="blue"
                @click="openGroupDetailPopup(item)"
              >
                <v-icon dark large>search</v-icon>
              </v-btn>
            </v-toolbar>
            <v-container fluid fill-height>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr
                          v-for="(sub_item, sub_index) in item.history_jobs"
                          :key="sub_index"
                        >
                          <v-row
                            align="center"
                            justify="center"
                            style="width:90vw;"
                          >
                            <v-col align="center" justify="center"
                              ><span>{{ sub_index + 1 }}</span></v-col
                            >
                            <v-col align="center" justify="center"
                              ><span>{{ sub_item.id }}</span></v-col
                            >
                            <v-col align="center" justify="center"
                              ><span>{{
                                sub_item.height * sub_item.sheet
                              }}</span></v-col
                            >
                            <v-col align="center" justify="center"
                              ><span>{{ sub_item.offsetPaper }}</span></v-col
                            >
                            <v-col align="center" justify="center"
                              ><span>
                                {{
                                  sub_item.height *
                                    (sub_item.sheet + sub_item.offsetPaper)
                                }}</span
                              ></v-col
                            >
                            <v-col align="center" justify="center"
                              ><span>
                                {{ parseDateFromDB(sub_item.workDate) }}</span
                              ></v-col
                            >
                            <v-col align="center" justify="center">
                              <v-row align="center" justify="center">
                                <v-btn
                                  v-if="isJobRunning != true"
                                  small
                                  fab
                                  dark
                                  elevation="2"
                                  color="blue"
                                  @click="openJobDetailPopup(sub_item)"
                                >
                                  <v-icon dark large>search</v-icon>
                                </v-btn>
                              </v-row>
                            </v-col>
                          </v-row>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table></v-col
                >
              </v-row>
            </v-container>
          </v-card>
        </v-list-item>
      </v-list></v-row
    >
    <v-footer absolute>
      <v-row align="center" class="text-h6 pl-10 elevation-2">
        <v-col
          ><span class="indigo--text">จำนวนงาน :</span
          ><span class="ml-2 mr-2">{{ totalJob }}</span
          ><span>งาน</span></v-col
        >
        <v-col
          ><span class="indigo--text">ความยาวงานเดิม :</span
          ><span class="ml-2 mr-2">{{ sumWorkLength.toFixed(2) }}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">เพิ่ม/ลดรวม :</span
          ><span class="ml-2 mr-2">{{ sumOffset.toFixed(2) }}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">รวมทั้งหมด :</span
          ><span class="ml-2 mr-2">{{
            (sumWorkLength + sumOffset).toFixed(2)
          }}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">ส่วนเกินรวม :</span
          ><span class="ml-2 mr-2">{{ sumOverhead.toFixed(2) }}</span
          ><span>เมตร</span></v-col
        >
      </v-row>
    </v-footer>

    <v-dialog v-model="isDialogShow" elevation="0">
      <Popup
        :type="dialogType"
        :value="dialogValue"
        @popup-event="popupEventHandler"
      ></Popup>
    </v-dialog>
    <v-dialog v-model="showDatePicker" width="100vw" height>
      <v-container>
        <v-row>
          <v-date-picker
            v-if="isStartDateSelected"
            v-model="startDate"
            width="40vw"
            locale="th"
            style="transform:scale(1.1);margin-left:20vw;margin-bottom:5vh;"
            :min="minStartDate"
            :max="maxStartDate"
          ></v-date-picker
        >
        <v-date-picker
            v-else
            v-model="endDate"
            width="40vw"
            locale="th"
            style="transform:scale(1.1);margin-left:20vw;margin-bottom:5vh;"
            :min="minEndDate"
            :max="maxEndDate"
          ></v-date-picker
        >
        </v-row>
        <v-row justify="center">
          <v-btn
            color="indigo"
            dark
            x-large
            bottom
            @click="showDatePicker = false"
            class="text-h5 ma-2"
          >
            ตกลง
          </v-btn>
          <!-- <v-btn
            color="indigo"
            dark
            x-large
            bottom
            @click="cancel()"
            class="text-h5  ma-2"
          >
            ยกเลิก
          </v-btn> -->
        </v-row>
      </v-container>
    </v-dialog>
    <v-overlay :value="overlay"
      ><v-progress-circular
        :size="50"
        color="indigo"
        indeterminate
      ></v-progress-circular
    ></v-overlay>
  </v-container>
</template>

<script>
import Popup from "@/components/Popup/Popup.vue";
import * as API from "../utills/api";
import moment from "moment";
export default {
  name: "HistoryJobList",
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Popup,
  },
  data() {
    return {
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      searchBy: "day",
      searchDay: "",
      searchMonth: "",
      searchYear: "",
      overlay: false,
      items: [],
      showDatePicker: false,
      startDate: "",
      endDate: "",
      isStartDateSelected: false,
      picker: "",
      minStartDate: undefined,
      maxStartDate: undefined,
      minEndDate: undefined,
      maxEndDate: undefined,
      sevenHoursInMilliSecond : 1000*60*60*7,
    };
  },
  methods: {
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel" || event.value == "save") {
          console.log('This is the line');
          this.isDialogShow = false;
        }
      } else if (event.type == "search-date") {
        this.items = event.value.jobs;
        if (event.value.searchBy == "day") {
          this.searchDay = event.value.day;
          this.searchMonth = event.value.month;
          this.searchYear = event.value.year;
        } else if (event.value.searchBy == "month") {
          this.searchMonth = event.value.month;
          this.searchYear = event.value.year;
          this.searchDay = "";
        } else if (event.value.searchBy == "year") {
          this.searchYear = event.value.year;
          this.searchDay = "";
          this.searchMonth = "";
        }
        this.isDialogShow = false;
      }
    },
    openGroupDetailPopup(group) {
      this.dialogType = "groupDetail";
      this.dialogValue = group;
      this.isDialogShow = true;
    },
    openJobDetailPopup(job) {
      this.dialogType = "jobDetail";
      this.dialogValue = job;
      this.isDialogShow = true;
    },
    parseDateFromDB(date) {
      var date = new Date(date);
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
    setStartDate() {
      if(this.endDate != "" && this.endDate != undefined){
        this.minStartDate = undefined;
        this.maxStartDate = this.endDate;
      }else{
        this.minStartDate = undefined;
        this.maxStartDate =  new Date(new Date().getTime()+this.sevenHoursInMilliSecond).toISOString().substring(0,10);
        
      }
      this.showDatePicker = true;
      this.isStartDateSelected = true;
    },
    setEndDate() {
      if(this.startDate != "" && this.startDate != undefined){
        this.minEndDate = this.startDate;
        this.maxEndDate = new Date(new Date().getTime()+this.sevenHoursInMilliSecond).toISOString().substring(0,10);
      }else{
        this.minEndDate = undefined;
        this.maxEndDate = new Date(new Date().getTime()+this.sevenHoursInMilliSecond).toISOString().substring(0,10);
      }
      this.showDatePicker = true;
      this.isStartDateSelected = false;
    },
    async getHistory() {
      this.overlay = true;
      let result = await API.historyGroups.listWithHistoryJobs({
        orderBy:'finishedAt',
        direction:'DESC',
        startedDate: this.startDate + ' 00:00:00',
        endedDate: this.endDate + ' 23:59:00'
      });
      this.overlay = false;
      if(!result.successful){
        this.dialogType = "error";
        this.dialogValue = { errorMessage:"กรุณาลองอีกครั้ง"};
        this.isDialogShow = true;
        return - 1;
      }

      this.items = result.data;

    },
    cancel() {
      this.showDatePicker = false;
    },
    async exportData() {
      this.overlay = true;
      const result = await this.api.getAllDrive();
      this.overlay = false;
      if (result.status == 0) {
        this.dialogType = "exportData";
        this.isDialogShow = true;
        this.dialogValue = {
          value: result.data,
          extraValue: { jobs: this.items },
        };
      }
    },
  },
  computed: {
    searchDateShow() {
      var date = "";
      if (this.searchDay != "") {
        date += this.searchDay;
      } else {
        date += "วัน";
      }
      date += "/";
      if (this.searchMonth != "") {
        date += this.searchMonth;
      } else {
        date += "เดือน";
      }
      date += "/";
      if (this.searchYear != "") {
        date += this.searchYear;
      } else {
        date += "ปี";
      }
      var listDate = date.split("/");
      if (this.searchBy == "day") {
        return listDate[0] + "/" + listDate[1] + "/" + listDate[2];
      } else if (this.searchBy == "month") {
        return listDate[1] + "/" + listDate[2];
      } else {
        return listDate[2];
      }
    },
    totalJob() {
      var sum = 0;
      this.items.forEach((element) => {
        sum += element.history_jobs.length;
      });
      return sum;
    },
    sumWorkLength() {
      var sum = 0;
      this.items.forEach((element) => {
        element.history_jobs.forEach((sub_element) => {
          sum += (sub_element.height * sub_element.sheet) / 100.0;
        });
      });
      return sum;
    },
    sumOffset() {
      var sum = 0;
      this.items.forEach((element) => {
        element.history_jobs.forEach((sub_element) => {
          sum += (sub_element.offsetPaper * sub_element.height) / 100.0;
        });
      });
      return sum;
    },
    sumOverhead() {
      var sum = 0;
      this.items.forEach((element) => {
        element.history_jobs.forEach((sub_element) => {
          sum += sub_element.wasteLength;
        });
      });
      return sum;
    },
    startDateShow() {
      var str = this.startDate;
      if (str == "") {
        return "วัน/เดือน/ปี";
      } else {
        var list = str.split("-");
        return list[2] + "/" + list[1] + "/" + (Number(list[0]) + 543);
      }
    },
    endDateShow() {
      var str = this.endDate;
      if (str == "") {
        return "วัน/เดือน/ปี";
      } else {
        var list = str.split("-");
        return list[2] + "/" + list[1] + "/" + (Number(list[0]) + 543);
      }
    },
  },
};
</script>
<style scoped>
.list-class {
  width: 95%;
  overflow: auto;
}
.handle {
  width: auto;
}
</style>
