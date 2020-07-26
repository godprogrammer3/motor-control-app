<template>
  <v-data-table
    height="83vh"
    :headers="headers"
    fixed-header
    :items="getJoblist"
    item-key="name"
    hide-default-footer
    :items-per-page="getJoblist.length"
    :item-class="row_class"
  >
    <template #item.action="{ item }">
      <div class="text-center">
        <v-btn
          class="mx-2"
          medium
          fab
          dark
          color="red"
          @click="$emit('show-dialog', { type: 'delete', item: item })"
        >
          <v-icon dark large>delete</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          medium
          fab
          dark
          color="indigo"
          @click="$emit('show-dialog', { type: 'edit', item: item })"
        >
          <v-icon dark large>create</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          medium
          fab
          dark
          color="green"
          @click="$emit('show-dialog', { type: 'operate', item: item })"
        >
          <v-icon dark large>play_arrow</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          text: "ลำดับ",
          align: "center",
          value: "no",
          class: "text-h6",
        },
        {
          text: "หมายเลขงาน",
          value: "workNo",
          align: "center",
          class: "text-h6",
        },
        { text: "ความยาว", value: "length", align: "center", class: "text-h6" },
        {
          text: "วันที่ดำเนินงาน",
          value: "workDate",
          align: "center",
          class: "text-h6",
        },
        {
          text: "การดำเนินงาน",
          value: "action",
          sortable: false,
          align: "center",
          class: "text-h6",
        },
      ],
      desserts: [],
    };
  },
  mounted() {
    for (let i = 1; i < 30; i++) {
      this.desserts.push({
        no: i,
        workNo: 20050384,
        length: 5864,
        workDate: "13/06/2020",
      });
    }
    this.itemsPerPage = this.desserts.length;
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
<style scoped></style>
