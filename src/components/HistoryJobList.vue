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
        { text: "เพิ่ม/ลด", value: "offset", align: "center" },
        { text: "ทั้งหมด", value: "total", align: "center" },
        { text: "วันที่", value: "workDate", align: "center" },
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
        offset: "+100",
        total: 5964,
        workDate: "13/06/2020",
      });
    }
    this.itemsPerPage = this.desserts.length;
  },
};
</script>

<style></style>
