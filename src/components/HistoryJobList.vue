<template>
  <div>
    <v-data-table
      height="79vh"
      :headers="headers"
      fixed-header
      fixed-footer
      :items="getHistoryJoblist"
      item-key="name"
      hide-default-footer
      :items-per-page="getHistoryJoblist.length"
    >
      <template #top>
        <v-toolbar>
          <v-card
            width="10vw"
            :color="selectedFillter == 'date' ? 'blue' : 'indigo'"
            link
            @click="selectedFillter = 'date'"
          >
            <v-card-text class="text-center white--text">วัน</v-card-text>
          </v-card>
          <v-divider class="mx-1" inset vertical></v-divider>
          <v-card
            width="10vw"
            :color="selectedFillter == 'month' ? 'blue' : 'indigo'"
            link
            @click="selectedFillter = 'month'"
          >
            <v-card-text class="text-center white--text">เดือน</v-card-text>
          </v-card>
          <v-divider class="mx-1" inset vertical></v-divider>
          <v-card
            width="10vw"
            :color="selectedFillter == 'year' ? 'blue' : 'indigo'"
            link
            @click="selectedFillter = 'year'"
          >
            <v-card-text class="text-center white--text">ปี</v-card-text>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            color="indigo"
            style="padding:5px;"
            @click="isDialogShow = true"
          >
            <span style="margin:5px;color:white;">{{ showDate }}</span>
            <v-icon color="white">date_range</v-icon>
          </v-card>
        </v-toolbar>
      </template>
      <template #footer>
        <div>
          <span style="margin-left:180px;">รวม 13 งาน</span>
          <span style="margin-left:100px;">63542 เมตร</span>
          <span style="margin-left:80px;">+1214 เมตร</span>
          <span style="margin-left:50px;">64756 เมตร</span>
        </div>
      </template>
    </v-data-table>
    <v-dialog ref="dialog" v-model="isDialogShow" persistent width="290px">
      <v-date-picker
        v-if="selectedFillter != 'year'"
        v-model="date"
        :type="selectedFillter"
        scrollable
        show-current="false"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="isDialogShow = false">Cancel</v-btn>
        <v-btn text color="primary" @click="updateDate">OK</v-btn>
      </v-date-picker>
      <v-card v-else elevation="0">
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <v-select
                :items="getAllYearInJobList"
                v-model:item-value="yearValue"
                label="ปี"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="isDialogShow = false"
              >Cancel</v-btn
            >
            <v-btn text color="primary" @click="updateDate">OK</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment, { locale } from "moment";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      selectedFillter: "date",
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          value: "no",
        },
        { text: "หมายเลขงาน", value: "workNo", align: "center" },
        { text: "ความยาว", value: "length", align: "center" },
        { text: "เพิ่ม/ลด", value: "offset", align: "center" },
        { text: "ทั้งหมด", value: "total", align: "center" },
        { text: "วันที่", value: "finishedTime", align: "center" },
      ],
      isDialogShow: false,
      date: new Date().toISOString().substring(0, 10),
      yearValue: "",
    };
  },
  mounted() {
    this.getJobListByDate({ type: this.selectedFillter, value: this.date });
    this.getJobList();
  },
  methods: {
    updateDate() {
      if (this.selectedFillter !== "year") {
        this.getJobListByDate({ type: this.selectedFillter, value: this.date });
      } else {
        this.getJobListByDate({ type: this.selectedFillter, value: this.date });
      }
      console.log(this.date);
      this.isDialogShow = false;
    },
    allowedDates: (val) =>
      this.selectedFillter === "date"
        ? this.getAllDateInJobList.includes(val)
        : this.getAllMonthInJobList.includes(val),
    ...mapActions(["getJobListByDate", "getJobList"]),
  },
  computed: {
    showDate() {
      if (this.selectedFillter == "date") {
        return this.date;
      } else if (this.selectedFillter == "month") {
        return this.date.substring(0, 7);
      } else {
        return this.date.substring(0, 4);
      }
    },
    ...mapGetters([
      "getHistoryJoblist",
      "getJoblist",
      "getAllDateInJobList",
      "getAllMonthInJobList",
      "getAllYearInJobList",
    ]),
  },
};
</script>

<style scoped></style>
