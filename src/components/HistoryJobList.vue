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
        v-dragscroll.y="true"
        class="mt-3 list-class"
        :style="{ height: '60vh' }"
      >
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-card width="100%" class="mb-5 rounded-xl">
            <v-toolbar
              :color="item.isContinue ? 'indigo' : 'orange'"
              height="95"
            >
              <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                >กลุ่มที่ {{ index + 1 }}</v-toolbar-title
              >
              <span class="text-h5 ml-5 white--text">{{
                item.isContinue ? "กลุ่มต่อเนื่อง" : "กลุ่มไม่ต่อเนื่อง"
              }}</span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="isJobRunning != true"
                large
                fab
                dark
                color="blue"
                @click="startJob(index)"
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
                          v-for="(sub_item, sub_index) in item.data"
                          :key="sub_index"
                        >
                          <td class="text-center text-h6 nocopy">
                            {{ sub_index + 1 }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.job_id }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.job_length }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.offset }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.amount }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            {{ sub_item.job_work_date }}
                          </td>
                          <td class="text-center text-h6 nocopy">
                            <v-btn
                              v-if="isJobRunning != true"
                              small
                              fab
                              dark
                              elevation="2"
                              color="blue"
                              @click="startJob(index)"
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
          ><span>จำนวนงาน</span><span class="ml-2 mr-2">100</span
          ><span>งาน</span></v-col
        >
        <v-col
          ><span>ความยาวรวม</span><span class="ml-2 mr-2">100</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span>เพิ่ม/ลดรวม</span><span class="ml-2 mr-2">100</span
          ><span>เมตร</span></v-col
        >
        <v-col
          ><span>รวมทั้งหมด</span><span class="ml-2 mr-2">100</span
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dragscroll } from "vue-dragscroll";
import Popup from "@/components/Popup.vue";
export default {
  name: "HomeJobList",
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    dragscroll,
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
      items: [
        {
          data: [
            {
              job_id: 127,
              job_length: 500,
              offset: 100,
              amount: 600,
              job_work_date: "5/09/63",
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              offset: -100,
              amount: 400,
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              offset: 100,
              amount: 600,
            },
          ],
          isContinue: true,
        },
        {
          data: [
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              offset: 100,
              amount: 600,
            },
          ],
          isContinue: true,
        },
        {
          data: [
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              offset: 100,
              amount: 600,
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              offset: 100,
              amount: 600,
            },
          ],
          isContinue: false,
        },
      ],
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      searchBy: "day",
      searchDate: "10/10/2563",
    };
  },
  mounted() {

  },
  methods: {
    

    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel" || event.value == "save") {
          this.isDialogShow = false;
        }
      } else if (event.type == "confirm-delete-job") {
        if (event.value == "cancel" || event.value == "yes") {
          this.isDialogShow = false;
        }
      } else if (event.type == "confirm-start-job") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
        } else if (event.value == "yes") {
          this.$router.replace("operating");
        }
      }
    },
    deleteJob(jobId) {
      this.dialogType = "confirm";
      this.dialogValue = { str: "deleteJob" };
      this.isDialogShow = true;
    },
    editJob(jobData) {
      this.dialogType = "editJob";
      this.dialogValue = jobData;
      this.isDialogShow = true;
    },
    showDialog(type) {
      if (type == "confirmDelete") {
        this.dialogType = "confirm";
        this.dialogValue = { str: "delete" };
      } else {
        this.dialogType = type;
      }
      this.isDialogShow = true;
    },
    startJob(groupId) {
      this.dialogType = "confirm";
      this.dialogValue = { str: "startJob", data: groupId };
      this.isDialogShow = true;
    },
  },
  computed: {
    searchDateShow() {
      var dateSplilt = this.searchDate.split("/");
      if (this.searchBy == "day") {
        return dateSplilt[0] + "/" + dateSplilt[1] + "/" + dateSplilt[2];
      } else if (this.searchBy == "month") {
        return dateSplilt[1] + "/" + dateSplilt[2];
      } else if (this.searchBy == "year") {
        return dateSplilt[2];
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
