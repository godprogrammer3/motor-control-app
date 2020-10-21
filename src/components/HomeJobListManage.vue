<template>
  <v-container fluid class="pa-0">
    <v-row
      class="elevation-2"
      justify="center"
      align="center"
      style="padding-left: 50px; padding-right: 50px"
    >
      <v-col v-for="(col, index) in headers" :key="index">
        <span class="text-h7"> {{ col.text }}</span>
      </v-col>
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
        >
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-card
              width="100%"
              class="mb-5 rounded-xl"
              v-if="
                (mode != 'manage-member-ingroup' ||
                  item.job.length == 1 ||
                  item.group_id == currentSelectedGroup.group_id) &&
                  (mode != 'add-group' || item.job.length == 1)
              "
            >
              <v-toolbar
                :color="item.is_continue ? 'indigo' : 'orange'"
                height="95"
                v-if="
                  (mode != 'manage-member-ingroup' || item.group_id == currentSelectedGroup.group_id)&& mode != 'add-group' 
                "
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มหมายเลข {{ item.group_id }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-switch
                  v-model="item.is_continue"
                  inset
                  hide-details
                  color="white"
                  style="transform: scale(1.3); margin-right: 100px"
                  v-if="mode == 'group-reorder'"
                >
                  <template v-slot:label>
                    <span class="white--text">
                      {{
                        item.is_continue ? "กลุ่มต่อเนื่อง" : "กลุ่มไม่ต่อเนื่อง"
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
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody v-if="mode == 'group-reorder'">
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
                              {{ sub_item.width }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.height }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.sheet }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ parseDateFormDB(sub_item.work_date) }}
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else-if="mode == 'add-group'">
                          <tr
                            v-for="(sub_item, sub_index) in item.job"
                            :key="sub_index"
                          >
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_id }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.width }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.height }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.sheet }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ parseDateFormDB(sub_item.work_date) }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              <v-row
                                ><v-checkbox
                                  v-model="sub_item.isSelected"
                                  style="transform: scale(1.5)"
                                ></v-checkbox
                              ></v-row>
                            </td>
                          </tr>
                        </tbody>
                        <draggable
                          v-model="item.job"
                          tag="tbody"
                          handle=".handle"
                          v-else-if="
                            mode == 'manage-member-ingroup'
                          "
                        >
                          <tr
                            v-for="(sub_item, sub_index) in item.job"
                            :key="sub_index"
                          >
                           <td class="text-center text-h6 nocopy handle">
                              <v-spacer></v-spacer>
                                <v-icon x-large> reorder </v-icon>
                              <v-spacer></v-spacer>
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_order}}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_id }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.width }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.height }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.sheet }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ parseDateFormDB(sub_item.work_date) }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              <v-row
                                ><v-checkbox
                                  v-model="sub_item.isSelected"
                                  style="transform: scale(1.5)"
                                ></v-checkbox
                              ></v-row>
                            </td>
                          </tr>
                        </draggable>
                      </template> </v-simple-table
                  ></v-col>
                </v-row>
              </v-container>
            </v-card> </v-list-item
        ></draggable> </v-list
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
export default {
  props: {
    isJobRunning: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    draggable,
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
      overlay:false
    };
  },
  mounted() {
    this.overlay = true;
    this.getAllJobByAllGroup().then(()=>{this.items = this.getAllJobByAllGroupData; this.overlay = false;});
  },
  methods: {
    ...mapActions(["getAllJobByAllGroup","reorderGroup","createGroupWithJob","updateInGroup"]),
    manageMemberInGroup(group) {
      this.currentSelectedGroup = group;
      this.mode = "manage-member-ingroup";
      this.items.forEach((item)=>{
        if(item.group_id == this.currentSelectedGroup.group_id){
          item.job.forEach((sub_item)=>sub_item.isSelected = true);
        }else{
          item.job.forEach((sub_item)=>sub_item.isSelected = false);
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
        this.overlay = true;
        await this.reorderGroup(this.items);
        this.overlay = false;
        this.$emit("handle-event", {
          type: "change_mode",
          value: "home",
        });
      } else if (this.mode == "add-group") {
        this.overlay = true;
        await this.createGroupWithJob(this.items);
        this.overlay = false;
        this.mode = "group-reorder";
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
     parseDateFormDB(date){
      let part = date.split('T');
      part = part[0].split('-');
      return part[2]+'/'+part[1]+'/'+part[0];
    },
    addGroupAction(){
      this.mode = 'add-group';
      this.items.forEach((item)=>{
        item.job.forEach((sub_item)=>sub_item.isSelected = false);
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
    }
  },
  computed: {
    ...mapGetters(["getAllJobByAllGroupData"]),
  },
  watch: {
    getAllJobByAllGroupData(newValue, oldValue) {
      if(newValue!= undefined){
        this.items = newValue;
      }
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
