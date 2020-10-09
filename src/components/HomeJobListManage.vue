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
            <v-card
              width="100%"
              class="mb-5 rounded-xl"
              v-if="
                (mode != 'manage-member-ingroup' ||
                  item.data.length == 1 ||
                  index == currentSelectedGroup) &&
                  (mode != 'add-group' || item.data.length == 1)
              "
            >
              <v-toolbar
                :color="item.isContinue ? 'indigo' : 'orange'"
                height="95"
                v-if="
                  (mode != 'manage-member-ingroup' || item.data.length != 1) &&
                    mode != 'add-group'
                "
              >
                <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
                  >กลุ่มที่ {{ index + 1 }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-switch
                  v-model="item.isContinue"
                  inset
                  hide-details
                  color="white"
                  style="transform: scale(1.3); margin-right: 100px"
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
                  @click="manageMemberInGroup(index)"
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
                              {{ sub_item.job_width }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_height }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_sheet }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_work_date }}
                            </td>
                          </tr>
                        </tbody>
                        <draggable
                          v-model="list"
                          tag="tbody"
                          handle=".handle"
                          v-else-if="
                            mode == 'manage-member-ingroup' ||
                              mode == 'add-group'
                          "
                        >
                          <tr
                            v-for="(sub_item, sub_index) in item.data"
                            :key="sub_index"
                          >
                            <td class="text-center handle">
                              <v-icon x-large> reorder </v-icon>
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_index + 1 }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_id }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_width }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_height }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_sheet }}
                            </td>
                            <td class="text-center text-h6 nocopy">
                              {{ sub_item.job_work_date }}
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
          @click="mode = 'add-group'"
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
import { dragscroll } from "vue-dragscroll";
export default {
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
      ],
      items: [
        {
          data: [
            {
              job_id: 123,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
            },
            {
              job_id: 124,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
            },
            {
              job_id: 125,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
            },
          ],
          isContinue: true,
        },
        {
          data: [
            {
              job_id: 126,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
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
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
            },
            {
              job_id: 128,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
              isSelected: true,
            },
          ],
          isContinue: false,
        },
      ],
      isDragableDisabled: false,
      mode: "group-reorder",
      currentSelectedGroup: null,
    };
  },
  mounted() {
    this.getJobList();
  },
  methods: {
    ...mapActions({
      getJobList: "getJobList",
    }),
    manageMemberInGroup(groubId) {
      this.currentSelectedGroup = groubId;
      this.mode = "manage-member-ingroup";
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
    handleSaveButton() {
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
    list() {},
  },
  computed: {
    ...mapGetters(["getJoblist"]),
  },
  watch: {},
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
