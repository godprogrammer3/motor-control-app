<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span
      ><span class="green--text ml-3">เริ่มงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>หมายเลข</span><span class="ml-3">1234</span></v-row
    >
    <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="green"
        @click="$emit('popup-confirm-start-job', 'yes')"
      >
        ใช่
      </v-btn>
      <v-btn
        class="text-h4 white--text"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-start-job', 'cancel')"
      >
        ยกเลิก
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
export default {};
</script>

<style></style>
