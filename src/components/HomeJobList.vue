<template>
  <v-data-table
    height="85vh"
    v-model="selected"
    :headers="headers"
    fixed-header
    :items="desserts"
    item-key="name"
    hide-default-footer
    :items-per-page="itemsPerPage"
  >
    <template #item.action="{ item }">
      <div class="text-center">
        <v-btn class="mx-2" small fab dark color="red">
          <v-icon dark>delete</v-icon>
        </v-btn>
        <v-btn class="mx-2" small fab dark color="indigo">
          <v-icon dark>create</v-icon>
        </v-btn>
        <v-btn class="mx-2" small fab dark color="green">
          <v-icon dark>play_arrow</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
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
  },
};
</script>

<style></style>
