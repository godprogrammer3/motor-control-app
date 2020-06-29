<template>
  <div>
    <v-data-table
      height="79vh"
      :headers="headers"
      fixed-header
      fixed-footer
      :items="desserts"
      item-key="name"
      hide-default-footer
      :items-per-page="itemsPerPage"
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
            :datenow="datenow"
            style="padding:5px;"
            @click=" isDialogShow = true "
          >
            <span style="margin:5px;color:white;">{{ datenow }}</span>
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
    <v-dialog
      ref="dialog"
      v-model="isDialogShow"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <v-date-picker
        v-if="selectedFillter!='year'"
        v-model="date"
        :type="selectedFillter"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="isDialogShow = false">Cancel</v-btn>
        <v-btn text color="primary" @click="isDialogShow = false">OK</v-btn>
      </v-date-picker>
      <v-card v-else elevation="0">
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <v-select :items="yearList" label="ปี"></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="isDialogShow = false">Cancel</v-btn>
            <v-btn text color="primary" @click="isDialogShow = false">OK</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      selectedFillter: "date",
      itemsPerPage: 10,
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          value: "no"
        },
        { text: "หมายเลขงาน", value: "workNo", align: "center" },
        { text: "ความยาว", value: "length", align: "center" },
        { text: "เพิ่ม/ลด", value: "offset", align: "center" },
        { text: "ทั้งหมด", value: "total", align: "center" },
        { text: "วันที่", value: "workDate", align: "center" }
      ],
      desserts: [],
      datenow: "",
      isDialogShow: false,
      date: "",
      yearList: [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028,
        2029,
        2030
      ]
    };
  },
  mounted() {
    for (let i = 1; i < 30; i++) {
      this.desserts.push({
        no: i,
        workNo: 20050384,
        length: 5864,
        offset: "+100",
        total: 5964,
        workDate: "13/06/2020"
      });
    }
    this.itemsPerPage = this.desserts.length;
    this.datenow = moment().format("DD/M/YYYY");
  },
  methods: {
    saveYear(year) {
      this.$refs.menu.save(year);

      // Reset activePicker to type YEAR
      this.$refs.picker.activePicker = "YEAR";

      // Close the menu/datepicker
      this.menu = false;
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  }
};
</script>

<style scoped></style>
