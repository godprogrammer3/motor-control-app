<template>
  <v-container fluid class="pa-0">
    <v-row
      class="elevation-2"
      justify="center"
      align="center"
      style="padding-left:50px;padding-right:50px;"
    >
      <v-col v-for="(col, index) in headers" :key="index">
        <span class="text-h7"> {{ col.text }}</span>
      </v-col>
    </v-row>
    <v-list v-dragscroll.y="true" class="mt-3 list-class">
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-card width="100%" class="mb-5 rounded-xl">
          <v-toolbar :color="item.isContinue ? 'indigo' : 'orange'" height="95">
            <v-toolbar-title class="text-h5 white--text ml-5 nocopy"
              >กลุ่มที่ {{ index + 1 }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-switch
              v-model="item.isContinue"
              inset
              color="white"
              style="transform: scale(1.5); margin-right:100px;"
            >
              <template v-slot:label>
                <span class="white--text">
                  {{
                    item.isContinue ? "กลุ่มต่อเนื่อง" : "กลุ่มไม่ต่อเนื่อง"
                  }}</span
                >
              </template>
            </v-switch>
            <v-btn x-large fab dark color="orange" class="mb-4">
              <v-icon dark large>create</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid fill-height>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <draggable v-model="item.data" tag="tbody" handle=".handle">
                      <tr
                        v-for="(sub_item, sub_index) in item.data"
                        :key="sub_index"
                      >
                        <td class="text-center text-h6 nocopy handle">
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
                      </tr>
                    </draggable>
                  </template>
                </v-simple-table></v-col
              >
            </v-row>
          </v-container>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HomeJobListElement from "@/components/HomeJobListElement.vue";
import draggable from "vuedraggable";
import { dragscroll } from "vue-dragscroll";
export default {
  directives: {
    dragscroll,
  },
  components: {
    HomeJobListElement,
    draggable,
  },
  data() {
    return {
      headers: [
        {
          text: "จัดลำดับ",
          col_size: 1,
        },
        {
          text: "ลำดับ",
          col_size: 1,
        },
        {
          text: "หมายเลขงาน",
          col_size: 2,
        },
        {
          text: "กว้าง",
          col_size: 2,
        },
        {
          text: "ยาว",
          col_size: 2,
        },
        {
          text: "จำนวนแผ่น",
          col_size: 2,
        },
        {
          text: "วันที่ดำเนินงาน",
          col_size: 2,
        },
      ],
      items: [
        {
          data: [
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
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
            },
            {
              job_id: 127,
              job_length: 500,
              job_work_date: "5/09/63",
              job_width: 5,
              job_height: 10,
              job_sheet: 10,
            },
          ],
          isContinue: false,
        },
      ],
      isDragableDisabled: false,
    };
  },
  mounted() {
    this.getJobList();
  },
  methods: {
    ...mapActions({
      getJobList: "getJobList",
    }),
    row_class() {
      let classes = [];
      classes.push("text-h2");
      return classes;
    },
  },
  computed: {
    ...mapGetters(["getJoblist"]),
  },
};
</script>
<style scoped>
.list-class {
  height: 75vh;
  overflow: auto;
}
.handle {
  width: auto;
}
</style>
