<template>
  <v-container fluid class="pa-0">
    <v-row class="elevation-2 pl-10">
      <v-col v-for="(col, index) in headers" :key="index" :cols="col.col_size">
        <span class="text-h6"> {{ col.text }}</span>
      </v-col>
    </v-row>
    <v-list v-dragscroll.y="true" class="mt-3 list-class">
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
              <v-btn x-large fab dark color="green" class="mb-4">
                <v-icon dark large>play_arrow</v-icon>
              </v-btn>
            </v-toolbar>
            <v-container fluid fill-height>
              <v-row align="center" justify="center">
                <v-col justify="center" align="center" cols="1" class="handle">
                  <v-spacer></v-spacer>
                  <v-icon x-large> reorder </v-icon>
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="11">
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
                                class="mr-2 mb-2"
                              >
                                <v-icon dark large>delete</v-icon>
                              </v-btn>
                              <v-btn
                                x-large
                                fab
                                dark
                                color="orange"
                                class="mb-4"
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
