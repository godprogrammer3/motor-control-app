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
    <template #header.text="{ header }">
      <tr>
        <td class="text-h5">{{ header.text }}</td>
        <td class="text-h5">{{ header.text }}</td>
        <td class="text-h5">{{ header.text }}</td>
        <td class="text-h5">{{ header.text }}</td>
        <td class="text-h5">{{ header.text }}</td>
        <td></td>
      </tr>
    </template>
    <template #item="{ item }">
      <tr>
        <td class="text-h5">{{ item.no }}</td>
        <td class="text-h5">{{ item.workNo }}</td>
        <td class="text-h5">{{ item.length }}</td>
        <td class="text-h5">{{ item.workDate }}</td>
        <td class="my-5">
          <div class="text-center">
            <v-btn
              class="ma-2"
              medium
              fab
              dark
              color="red"
              @click="$emit('show-dialog', { type: 'delete', item: item })"
            >
              <v-icon dark large>delete</v-icon>
            </v-btn>
            <v-btn
              class="ma-2"
              medium
              fab
              dark
              color="indigo"
              @click="$emit('show-dialog', { type: 'edit', item: item })"
            >
              <v-icon dark large>create</v-icon>
            </v-btn>
            <v-btn
              class="ma-2"
              medium
              fab
              dark
              color="green"
              @click="$emit('show-dialog', { type: 'operate', item: item })"
            >
              <v-icon dark large>play_arrow</v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
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
          align: "start",
          value: "no",
          class: "text-h5",
        },
        {
          text: "หมายเลขงาน",
          value: "workNo",
          align: "start",
          class: "text-h5",
        },
        { text: "ความยาว", value: "length", align: "start", class: "text-h5" },
        {
          text: "วันที่ดำเนินงาน",
          value: "workDate",
          align: "start",
          class: "text-h5",
        },
        {
          text: "การดำเนินงาน",
          value: "action",
          sortable: false,
          align: "center",
          class: "text-h5",
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
