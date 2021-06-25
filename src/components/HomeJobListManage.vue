<template>
  <v-container fluid class="pa-0">
    <v-row
      v-if="mode == 'group-reorder'"
      class="elevation-2"
      justify="center"
      align="center"
    >
    <v-col cols="1">
      <v-row>
        <v-col align="center" justify="center"><span>จัดลำดับกลุ่ม</span></v-col>
      </v-row>
    </v-col>
    <v-col cols="10">
       <v-row>
        <v-col align="center" justify="center"><span>ลำดับงาน</span></v-col>
        <v-col align="center" justify="center"><span>หมายเลขงาน</span></v-col>
        <v-col align="center" justify="center"><span>หน้ากว้าง</span></v-col>
        <v-col align="center" justify="center"><span>ความยาวแผ่น</span></v-col>
        <v-col align="center" justify="center"><span>จำนวนแผ่น</span></v-col>
        <v-col align="center" justify="center"><span>ความยาวงาน</span></v-col>
        <v-col align="center" justify="center"><span>วันที่ดำเนินงาน</span></v-col>
      </v-row>
    </v-col>
    </v-row>
    <v-row
      v-else-if="mode == 'add-group'"
      class="elevation-2"
      justify="center"
      align="center"
      style="padding-left:3vw;padding-right:7vw;"
    >
      <v-col align="center" justify="center"><span>หมายเลขงาน</span></v-col>
      <v-col align="center" justify="center"><span>หน้ากว้าง</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>จำนวนแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวงาน</span></v-col>
      <v-col align="center" justify="center"><span>วันที่ดำเนินงาน</span></v-col>
      <v-col align="center" justify="center"><span>เลือก</span></v-col>
    </v-row>
     <v-row
      v-else-if="mode == 'manage-member-ingroup'"
      class="elevation-2"
      justify="center"
      align="center"
      style="padding-left:3vw;padding-right:7vw;"
    >
      <v-col align="center" justify="center"><span>จัดลำดับงาน</span></v-col>
      <v-col align="center" justify="center"><span>ลำดับงาน</span></v-col>
      <v-col align="center" justify="center"><span>หมายเลขงาน</span></v-col>
      <v-col align="center" justify="center"><span>หน้ากว้าง</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>จำนวนแผ่น</span></v-col>
      <v-col align="center" justify="center"><span>ความยาวงาน</span></v-col>
      <v-col align="center" justify="center"><span>วันที่ดำเนินงาน</span></v-col>
      <v-col align="center" justify="center"><span>เลือก</span></v-col>
    </v-row>
    <v-row align="center" justify="center"
      ><v-list
        class="mt-3 list-class"
        :style="{ height: isJobRunning ? '60vh' : '70vh' }"
      >
        <draggable
          v-model="items"
          :disabled="isDragableDisabled"
          handle=".handle"
          ghost-class="ghost"
        >
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-card
              width="100%"
              class="mb-5 rounded-xl"
              v-if="
                (mode != 'manage-member-ingroup' ||
                  item.jobs.length == 1 ||
                  item.id == currentSelectedGroup.id) &&
                  (mode != 'add-group' || item.jobs.length == 1)
              "
            >
              <v-toolbar
                :color="item.isContinue ? 'indigo' : 'orange'"
                height="95"
                v-if="
                  (mode != 'manage-member-ingroup' || item.id == currentSelectedGroup.id)&& mode != 'add-group' 
                "
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มหมายเลข {{ item.id }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-switch
                  v-model="item.isContinue"
                  inset
                  hide-details
                  color="white"
                  style="transform: scale(1.3); margin-right: 100px;"
                  v-if="mode == 'group-reorder'"
                >
                  <template v-slot:label>
                    <span class="white--text">
                      {{
                        item.isContinue ? "กลุ่มต่อเนื่อง" : "กลุ่มไม่ต่อเนื่อง"
                      }}</span
                    >
                  </template>
                </v-switch>
                <v-btn
                  x-large
                  fab
                  dark
                  color="orange"
                  @click="manageMemberInGroup(item)"
                  v-if="mode == 'group-reorder'"
                >
                  <v-icon dark large>create</v-icon>
                </v-btn>
              </v-toolbar>
              <v-container fluid fill-height>
                <v-row align="center" justify="center">
                  <v-col
                    justify="center"
                    align="center"
                    cols="1"
                    class="handle"
                    v-if="mode == 'group-reorder'"
                  >
                    <v-spacer></v-spacer>
                    <v-icon x-large> reorder </v-icon>
                    <v-spacer></v-spacer>
                  </v-col>
                <v-col :cols="mode == 'group-reorder' ? 11 : 12">
                <v-row align="center" justify="center">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody v-if="mode == 'group-reorder'" >
                          <tr
                            v-for="(sub_item, sub_index) in item.jobs"
                            :key="sub_index"
                            
                          >
                          <v-row align="center" justify="center" style="width:90vw;">
                            <v-col align="center" justify="center"><span>{{ sub_index + 1 }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.id }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.width}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ sub_item.sheet}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height * sub_item.sheet / 100.0}}</span></v-col>
                            <v-col align="start" justify="start"><span> {{ parseDateFromDB(sub_item.workDate) }}</span></v-col>
                           </v-row>
                          </tr>
                        </tbody>
                         <tbody v-else-if="mode == 'add-group'">
                           
                          <tr
                            v-for="(sub_item, sub_index) in item.jobs"
                            :key="sub_index"
                          >
                          <v-row align="center" justify="center" style="width:90vw;">
                            <v-col align="center" justify="center"><span>{{ sub_item.id }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.width}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ sub_item.sheet}}</span></v-col>
                            <v-col align="center" justify="center"><span >{{ sub_item.height * sub_item.sheet / 100.0}}</span></v-col>
                            <v-col align="center" justify="center"><span class="mr-7"> {{ parseDateFromDB(sub_item.workDate) }}</span></v-col>
                            <v-col align="center" justify="center"><v-checkbox
                                  v-model="sub_item.isSelected"
                                  style="transform: scale(1.5);margin-left:5vw;"
                                  @change="calculateCreatable"
                                ></v-checkbox
                              ></v-col>
                           </v-row>
                          </tr>
                        </tbody>
                        <draggable
                          v-model="item.jobs"
                          tag="tbody"
                          handle=".handle"
                          ghost-class="ghost"
                          v-else-if="
                            mode == 'manage-member-ingroup'
                          "
                        >
                          <tr
                            v-for="(sub_item, sub_index) in item.jobs"
                            :key="sub_index"
                          >
                          <v-row align="center" justify="center" style="width:90vw;">
                            <v-col align="center" justify="center" class="handle"> <v-icon x-large> reorder </v-icon></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.id }}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.width}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ sub_item.sheet}}</span></v-col>
                            <v-col align="center" justify="center"><span>{{ sub_item.height * sub_item.sheet / 100.0}}</span></v-col>
                            <v-col align="center" justify="center"><span> {{ parseDateFromDB(sub_item.workDate) }}</span></v-col>
                            <v-col align="center" justify="center"><v-checkbox
                                  v-model="sub_item.isSelected"
                                  style="transform: scale(1.5);margin-left:5vw;"
                                ></v-checkbox
                              ></v-col>
                           </v-row>
                          </tr>
                        </draggable>
                      </template> </v-simple-table
                  >
                </v-row>
                </v-col>
                </v-row>
              </v-container>
            </v-card> </v-list-item
        ></draggable> 
         <v-container v-if="isNotHasData" fill-height fluid >
          <v-row align="center" justify="center">
            <v-col justify="center" align="center" class="not-found-text">ยังไม่มีงานในระบบ</v-col>
          </v-row>
        </v-container>
        </v-list
    ></v-row>
    <v-row>
      <v-spacer> </v-spacer>
      <v-col v-if="mode === 'group-reorder'" class="pa-1">
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="addGroupAction"
          class="text-h5"
        >
          เพิ่มกลุ่ม
        </v-btn>
      </v-col>
      <v-col class="pa-1">
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="handleSaveButton"
          class="text-h5"
          :disabled="mode == 'add-group' && !isCreatable"
        >
          บันทึก
        </v-btn>
      </v-col>
      <v-col class="pa-1">
        <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="handleCancelButton"
          class="text-h5"
        >
          ยกเลิก
        </v-btn>
      </v-col></v-row
    >
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
import * as API from "../utills/api";
import Popup from "./Popup/Popup.vue";
export default {
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    draggable,
    Popup
  },
  data() {
    return {
      headers: [
        {
          text: "จัดลำดับ",
        },
        {
          text: "ลำดับ",
        },
        {
          text: "หมายเลขงาน",
        },
        {
          text: "หน้ากว้าง",
        },
        {
          text: "ความยาว",
        },
        {
          text: "จำนวนแผ่น",
        },
        {
          text: "วันที่ดำเนินงาน",
        },
      ],
      isDragableDisabled: false,
      mode: "group-reorder",
      currentSelectedGroup: null,
      items:[],
      overlay:false,
      dialogType:{},
      dialogValue:{},
      isDialogShow:false,
      isNotHasData:false,
      isCreatable:false

    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["getAllJobByAllGroup","reorderGroup","createGroupWithJob","updateInGroup"]),
    manageMemberInGroup(group) {
      this.currentSelectedGroup = group;
      this.mode = "manage-member-ingroup";
      this.items.forEach((item)=>{
        if(item.id == this.currentSelectedGroup.id){
          item.jobs.forEach((sub_item)=>sub_item.isSelected = true);
        }else{
          item.jobs.forEach((sub_item)=>sub_item.isSelected = false);
        }
      });
      this.headers = [
        {
          text: "จัดลำดับ",
        },
        {
          text: "ลำดับ",
        },
        {
          text: "หมายเลขงาน",
        },
        {
          text: "กว้าง",
        },
        {
          text: "ยาว",
        },
        {
          text: "จำนวนแผ่น",
        },
        {
          text: "วันที่ดำเนินงาน",
        },
        {
          text: "การเลือก",
        },
      ];
    },
    async handleSaveButton() {
      if (this.mode == "manage-member-ingroup") {
        var payload = [];
        this.items.forEach((element)=>{
          element.job.forEach((sub_job)=>{
            if( sub_job.group_id == this.currentSelectedGroup.group_id || sub_job.isSelected){
              payload.push(sub_job);
            }
          });
        });
        await this.updateInGroup({jobs:payload,group_id:this.currentSelectedGroup.group_id});
        this.mode = "group-reorder";
      } else if (this.mode == "group-reorder") {
        this.items.forEach((group,index)=>group.order = index +1);
        this.overlay = true;
        const result = await API.groups.updateList(this.items);
        this.overlay = false;
        if(result.successful){
          this.$emit("handle-event", {
            type: "change_mode",
            value: "home",
          });
        }else{
          this.dialogType = 'error';
          this.dialogValue = { errorMessage:'กรุณาลองอีกครั้ง'};
        }
       
      } else if (this.mode == "add-group") {
        this.overlay = true;
        const selectedJobs = [];
       
        this.items.forEach(
          group =>
          group.jobs.forEach((job)=>{
            if( job.isSelected ){
              selectedJobs.push(job);
            }
          })
        ); 
        console.log(selectedJobs);
        const result = await API.groups.createWithJobs(selectedJobs);
        this.overlay = false;
        if(result.successful){
          this.fetchData();
          this.mode = "group-reorder";
        }else{
          this.dialogType = 'error';
          this.dialogValue = { errorMessage:'กรุณาลองอีกครั้ง'};
          this.isDialogShow = true;
        }
      }
    },
    handleCancelButton() {
      if (this.mode == "manage-member-ingroup") {
        this.mode = "group-reorder";
      } else if (this.mode == "group-reorder") {
        this.$emit("handle-event", {
          type: "change_mode",
          value: "home",
        });
      } else if (this.mode == "add-group") {
        this.mode = "group-reorder";
      }
    },
    parseDate(date){
      let part = date.split(' ');
      part = part[0].split('-');
      return part[2]+'/'+part[1]+'/'+part[0];
    },
    parseDateFromDB(date){
      var date = new Date(date);
      return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    },
    addGroupAction(){
      this.mode = 'add-group';
      this.items.forEach((group)=>{
        group.jobs.forEach((job)=>job.isSelected = false);
      });
      this.headers = [
        {
          text: "หมายเลขงาน",
        },
        {
          text: "กว้าง",
        },
        {
          text: "ยาว",
        },
        {
          text: "จำนวนแผ่น",
        },
        {
          text: "วันที่ดำเนินงาน",
        },
        {
          text: "การเลือก",
        },
      ];
    },
    fetchData(){
      this.overlay = true;
      API.groups.listWithJobs({
        orderBy:'order',
        direction:'ASC'
      }).then((response) => {
        this.overlay = false;
        if (response.successful) {
          if (response.data.length) {
            this.isNotHasData = false;
            this.items = response.data;
          } else {
            this.isNotHasData = true;
          }
        }else{
          this.dialogType = 'error';
          this.dialogValue = { errorMessage: 'กรุณาลองอีกครั้ง'};
          this.isDialogShow = true;
        }
      });
    },
    popupEventHandler(event) {
      if (event.type == "action") {
        this.fetchData();
        if (event.value == "cancel" || event.value == "save") {
          this.isDialogShow = false;
          this.dialogValue = {};
        }
      }
    },
    calculateCreatable(event){
      const selectedJobs = [];
      this.items.forEach(group=>
        group.jobs.forEach(( job )=>{
          if(job.isSelected){
            selectedJobs.push(job);
          }
        }
        )
      );
      if(selectedJobs.length > 1){
        this.isCreatable = true;
      }else{
         this.isCreatable = false;
      }
    }
  },
  computed: {
    ...mapGetters(["getAllJobByAllGroupData"]),
  },
};
</script>
<style scoped>
.list-class {
  width: 95%;
  overflow: auto;
}
.handle {
  --dummy:1;
}
.ghost {
  opacity: 0.5;
}
</style>
