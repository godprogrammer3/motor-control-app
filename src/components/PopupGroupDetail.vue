<template>
  <v-card width="100%" class="mb-5 rounded-xl">
    <v-col align="center" justify="center" class="text-h3 pa-5">
      <v-row align="center" justify="center"
        ><span>ยืนยันที่จะ</span
        ><span class="red--text ml-3">ยกเลิกงาน</span></v-row
      >
      <v-row align="center" justify="center"
        ><span>หมายเลข</span><span class="ml-3">1234</span></v-row
      >
      <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
      <v-row align="center" justify="space-around" class="mt-4">
        <v-btn
          class="text-h4 white--text px-10"
          style="height:auto;width:auto;"
          color="indigo"
          @click="$emit('popup-confirm-start-job', 'cancel')"
        >
          ย้อนกลับ
        </v-btn>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
