<template>
  <v-container fluid class="pa-0">
    <v-row class="elevation-2 pl-10 ma-0" style="background-color:white;">
      <v-col v-for="(col, index) in headers" :key="index" :cols="col.col_size">
        <span class="text-h7"> {{ col.text }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-list
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
                :color="item.is_continue ? 'indigo' : 'orange'"
                height="95"
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มหมายเลข {{ item.group_id }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn
                  v-if="isJobRunning != true"
                  fab
                  dark
                  color="green"
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
                            v-for="(sub_item, sub_index) in item.job"
                            :key="sub_index"
                          >
                            <td class="text-center text-h6 nocopy">
                              {{ sub_index + 1 }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_id }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.height * sub_item.sheet / 100.0 }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ parseDateFromDB(sub_item.work_date) }}
                            </td>
                            <td>
                              <div class="text-center">
                                <v-btn
        
                                  fab
                                  dark
                                  color="red"
                                  class="ma-1"
                                  elevation="1"
                                  @click="deleteJob(sub_item)"
                                >
                                  <v-icon dark large>delete</v-icon>
                                </v-btn>
                                <v-btn
                               
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
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
import Popup from "@/components/Popup.vue";
export default {
  name: "HomeJobList",
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
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
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      overlay:false,
      items:[]
    };
  },
  mounted() {
    this.overlay = true;
    this.getAllJobByAllGroup().then(()=>{this.items = this.getAllJobByAllGroupData ,this.overlay = false;});
  },
  methods: {
    ...mapActions(['getAllJobByAllGroup']),
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "cancel" || event.value == "save") {
          this.isDialogShow = false;
          this.dialogValue = {};
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
    deleteJob(job) {
      this.dialogType = "confirm";
      this.dialogValue = { str: "deleteJob" ,value : job};
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
        this.dialogValue = { str: "createJob" };
      }
      this.isDialogShow = true;
    },
    startJob(groupId) {
      this.dialogType = "confirm";
      this.dialogValue = { str: "startJob", data: groupId };
      this.isDialogShow = true;
    },
    parseDateFromDB(date){
      let part = date.split('T');
      part = part[0].split('-');
      return part[2]+'/'+part[1]+'/'+part[0];
    }
  },
  computed: {
    ...mapGetters(["getAllJobByAllGroupData"])
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
