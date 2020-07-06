<template>
  <v-data-table
    height="83vh"
    :headers="headers"
    fixed-header
    :items="getJoblist"
    item-key="name"
    hide-default-footer
    :items-per-page="getJoblist.length"
  >
    <template #item.action="{ item }">
      <div class="text-center">
        <v-btn
          class="mx-2"
          small
          fab
          dark
          color="red"
          @click="$emit('show-dialog', { type: 'delete', item: item })"
        >
          <v-icon dark>delete</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          small
          fab
          dark
          color="indigo"
          @click="$emit('show-dialog', { type: 'edit', item: item })"
        >
          <v-icon dark>create</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          small
          fab
          dark
          color="green"
          @click="$emit('show-dialog', { type: 'operate', item: item })"
        >
          <v-icon dark>play_arrow</v-icon>
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
        },
        { text: "หมายเลขงาน", value: "workNo", align: "center" },
        { text: "ความยาว", value: "length", align: "center" },
        { text: "วันที่ดำเนินงาน", value: "workDate", align: "center" },
        {
          text: "การดำเนินงาน",
          value: "action",
          sortable: false,
          align: "center",
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
  },
  computed: {
    ...mapGetters(["getJoblist"]),
  },
};
</script>

<style></style>
