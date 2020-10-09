<template>
  <v-container fluid class="pa-0">
    <v-row class="elevation-2 pl-10 ma-0" style="background-color:white;">
      <v-col v-for="(col, index) in headers" :key="index" :cols="col.col_size">
        <span class="text-h7"> {{ col.text }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-list
        v-dragscroll.y="true"
        class="mt-3 list-class"
        :style="{ height: isJobRunning ? '60vh' : '70vh' }"
      >
        <draggable
          v-model="items"
          :disabled="isDragableDisabled"
          handle=".handle"
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
                <v-spacer></v-spacer>
                <v-btn
                  v-if="isJobRunning != true"
                  x-large
                  fab
                  dark
                  color="green"
                  class="mb-4"
                  @click="startJob(index)"
                >
                  <v-icon dark large>play_arrow</v-icon>
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
                              {{ sub_item.job_work_date }}
                            </td>
                            <td>
                              <div class="text-center">
                                <v-btn
                                  x-large
                                  fab
                                  dark
                                  color="red"
                                  class="ma-1"
                                  elevation="1"
                                  @click="deleteJob(sub_item.job_id)"
                                >
                                  <v-icon dark large>delete</v-icon>
                                </v-btn>
                                <v-btn
                                  x-large
                                  fab
                                  dark
                                  color="orange"
                                  class="ma-1"
                                  elevation="1"
                                  @click="editJob(sub_item)"
                                >
                                  <v-icon dark large>create</v-icon>
                                </v-btn>
                              </div>
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
        </draggable>
      </v-list></v-row
    >
    <v-row align="center" style="height:10vh;">
      <v-spacer> </v-spacer>
      <v-col>
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="
            $emit('handle-event', {
              type: 'change_mode',
              value: 'home_manage_group',
            })
          "
          class="text-h5 mr-5"
        >
          จัดการกลุ่ม
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="showDialog('createJob')"
          class="text-h5"
        >
          เพิ่มงาน
        </v-btn>
      </v-col>
    </v-row>
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
import draggable from "vuedraggable";
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
    draggable,
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
          text: "วันที่ดำเนินงาน",
          col_size: 3,
        },
        {
          text: "การดำเนินงาน",
          col_size: 3,
        },
      ],
      items: [
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: true,
        },
        {
          data: [{ job_id: 127, job_length: 500, job_work_date: "5/09/63" }],
          isContinue: true,
        },
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: false,
        },
      ],
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
    };
  },
  mounted() {
    this.getJobList();
  },
  methods: {
    ...mapActions({
      getJobList: "getJobList",
    }),

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
    ...mapGetters(["getJoblist"]),
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
