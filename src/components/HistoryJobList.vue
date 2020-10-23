<template>
  <v-container fluid class="pa-0">
    <v-row
      class="elevation-0 pl-10 ma-0"
      style="background-color:white;"
      align="center"
    >
      <v-btn
        style="width:9vw;height:9vh;"
        class="ma-2 white--text"
        :color="searchBy == 'day' ? 'indigo' : 'grey'"
        @click="searchBy = 'day'"
        ><span class="text-h5">วัน</span></v-btn
      >
      <v-btn
        style="width:9vw;height:9vh;"
        class="ma-2"
        :color="searchBy == 'month' ? 'indigo' : 'grey'"
        @click="searchBy = 'month'"
        ><span class="text-h5 white--text">เดือน</span></v-btn
      >
      <v-btn
        style="width:9vw;height:9vh;"
        class="ma-2"
        :color="searchBy == 'year' ? 'indigo' : 'grey'"
        @click="searchBy = 'year'"
        ><span class="text-h5 white--text">ปี</span></v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        style="width:auto;height:auto;"
        class="ma-2 pl-6 pr-6 pt-4 pb-4 white--text"
        color="indigo"
        @click="showSearchDatePopup"
        ><v-row align="center" justify="center"
          ><v-icon x-large>date_range</v-icon
          ><span class="text-h5">{{ searchDateShow }}</span></v-row
        ></v-btn
      >
    </v-row>
    <v-row class="elevation-2 pl-10 ma-0" style="background-color:white;">
      <v-col v-for="(col, index) in headers" :key="index">
        <span class="text-h7"> {{ col.text }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-list
        class="mt-3 list-class"
        :style="{ height: '60vh' }"
      >
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-card width="100%" class="mb-5 rounded-xl">
            <v-toolbar
              :color="item.is_continue ? 'indigo' : 'orange'"
              height="95"
            >
              <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                >กลุ่มหมายเลข {{ item.group_id }}</v-toolbar-title
              >
              <span class="text-h5 ml-5 white--text">{{
                item.is_continue ? "กลุ่มต่อเนื่อง" : "กลุ่มไม่ต่อเนื่อง"
              }}</span>
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
                          v-for="(sub_item, sub_index) in item.job"
                          :key="sub_index"
                        >
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.job_order }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.job_id }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.height * sub_item.sheet }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.offset }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.height * (sub_item.sheet+sub_item.offset) }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ parseDateFromDB(sub_item.work_date) }}
                          </td>
                          <td class="text-center text-h6 nocopy">
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
                          </td>
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
          ><span class="indigo--text">จำนวนงาน :</span><span class="ml-2 mr-2">{{totalJob}}</span
          ><span>งาน</span></v-col
        >
        <v-col
          ><span class="indigo--text">ความยาวงานรวม :</span><span class="ml-2 mr-2">{{sumWorkLength.toFixed(2)}}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">เพิ่ม/ลดรวม :</span><span class="ml-2 mr-2">{{sumOffset.toFixed(2)}}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">รวมทั้งหมด :</span><span class="ml-2 mr-2">{{(sumWorkLength+sumOffset).toFixed(2)}}</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span class="indigo--text">ส่วนเกินรวม :</span><span class="ml-2 mr-2">{{sumOverhead.toFixed(2)}}</span
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
    <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Popup from "@/components/Popup.vue";
import API from "@/store/api";
export default {
  name: "HomeJobList",
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
      headers: [
        {
          text: "ลำดับ",
          col_size: 1,
        },
        {
          text: "หมายเลขงาน",
          col_size: 2,
        },
        {
          text: "ความยาว",
          col_size: 2,
        },
        {
          text: "เพิ่ม/ลด",
          col_size: 3,
        },
        {
          text: "ทั้งหมด",
          col_size: 3,
        },
        {
          text: "วันที่ดำเนินงาน",
          col_size: 3,
        },
        {
          text: "รายละเอียด",
          col_size: 3,
        },
        
      ],
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      searchBy: "day",
      searchDay: '',
      searchMonth: '',
      searchYear: '',
      overlay:false,
      items:[],
      api:new API()
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions(["getAllHistoryJobByAllGroup"]),
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel" || event.value == "save") {
          this.isDialogShow = false;
        }
      }else if( event.type == 'search-date'){
        this.items = event.value.jobs;
        if(event.value.searchBy == 'day'){
          this.searchDay = event.value.day;
          this.searchMonth = event.value.month;
          this.searchYear = event.value.year;
        }else if( event.value.searchBy == 'month'){
          this.searchMonth = event.value.month;
          this.searchYear = event.value.year;
          this.searchDay = '';
        }else if( event.value.searchBy == 'year'){
          this.searchYear = event.value.year;
          this.searchDay = '';
          this.searchMonth = '';
        }
        this.isDialogShow = false;
      }
    },
    openGroupDetailPopup(group){
      this.dialogType = "groupDetail";
      this.dialogValue = group;
      this.isDialogShow = true;
    },
    openJobDetailPopup(job){
      this.dialogType = "jobDetail";
      this.dialogValue = job;
      this.isDialogShow = true;
    },
    parseDateFromDB(date){
      var d = new Date(date);
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      var offset = 7;
      date = new Date(utc + (3600000*offset));
      date = date.toISOString();
      let part = date.split('T');
      part = part[0].split('-');
      return part[2]+'/'+part[1]+'/'+part[0];
    },
    showSearchDatePopup(){
      this.dialogType = "searchDate";
      this.dialogValue = {str:this.searchBy};
      this.isDialogShow = true;
      
    }
  },
  computed: {
    ...mapGetters(["getAllHistoryJobByAllGroupData"]),
    searchDateShow() {
      var date = '';
      if(this.searchDay !=''){
        date += this.searchDay;
      }else{
        date += 'วัน';
      }
      date += '/';
      if(this.searchMonth !=''){
        date += this.searchMonth;
      }else{
        date += 'เดือน';
      }
      date += '/';
      if(this.searchYear !=''){
        date += this.searchYear;
      }else{
        date += 'ปี';
      }
      var listDate = date.split('/');
      if(this.searchBy == 'day'){
        return listDate[0]+'/'+listDate[1]+'/'+listDate[2];
      }else if( this.searchBy == 'month' ){
        return listDate[1]+'/'+listDate[2];
      }else{
        return listDate[2];
      }
    },
    totalJob(){
      var sum = 0;
      this.items.forEach(element => {
        sum += element.job.length;
      });
      return sum;
    },
    sumWorkLength(){
      var sum = 0;
      this.items.forEach(element => {
        element.job.forEach((sub_element)=>{
          sum += sub_element.height * sub_element.sheet / 100.0;
        });
      });
      return sum;
    },
    sumOffset(){
      var sum = 0;
      this.items.forEach(element => {
        element.job.forEach((sub_element)=>{
          sum += sub_element.offset * sub_element.height / 100.0;
        });
      });
      return sum;
    },
    sumOverhead(){
       var sum = 0;
      this.items.forEach(element => {
        element.job.forEach((sub_element)=>{
          sum += sub_element.overhead;
        });
      });
      return sum;
    }
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
