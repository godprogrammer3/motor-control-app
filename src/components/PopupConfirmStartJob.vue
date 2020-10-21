<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span
      ><span class="green--text ml-3">เริ่มงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>กลุ่มหมายเลข</span><span class="ml-3">{{group.group_id}}</span></v-row
    >
    <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="green"
        @click="$emit('popup-confirm-start-job', {str:'yes',group:group})"
      >
        ใช่
      </v-btn>
      <v-btn
        class="text-h4 white--text"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-start-job', {str:'cancel',group:group})"
      >
        ยกเลิก
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default: ()=>{}
    },
  },
};
</script>

<style></style>
