<template>
  <div>
    <v-col v-if="!isError" align="center" justify="center" class="text-h3 pa-5">
      <v-row align="center" justify="center"
        ><span>ยืนยันที่จะ</span
        ><span class="red--text ml-3">ลบงาน</span></v-row
      >
      <v-row align="center" justify="center"
        ><span>หมายเลข</span><span class="ml-3">{{ job.id }}</span></v-row
      >
      <v-row align="center" justify="center"><span>ใช่หรือไม่ ?</span> </v-row>
      <v-row align="center" justify="space-around" class="mt-4">
        <v-btn
          class="text-h4 white--text px-10"
          style="height:auto;width:auto;"
          color="red"
          @click="deleteJobAction"
        >
          ใช่
        </v-btn>
        <v-btn
          class="text-h4 white--text"
          style="height:auto;width:auto;"
          color="grey"
          @click="$emit('popup-confirm-delete-job', 'cancel')"
        >
          ยกเลิก
        </v-btn>
      </v-row>
      <v-overlay :value="overlay"
        ><v-progress-circular
          :size="50"
          color="indigo"
          indeterminate
        ></v-progress-circular
      ></v-overlay>
    </v-col>
    <v-col v-else align="center" justify="center" class="text-h3 pa-5">
      <v-row align="center" justify="center"
        ><span class="red--text">เกิดข้อผิดพลาดในการดำเนินการ!</span>
      </v-row>
      <v-row align="center" justify="center"
        ><span >กรุณาลองอีกครั้ง</span>
      </v-row>
      <v-row align="center" justify="space-around" class="mt-4">
        <v-btn
          class="text-h4 white--text"
          style="height:auto;width:auto;"
          color="grey"
          @click="$emit('popup-confirm-delete-job', 'cancel')"
        >
          ย้อนกลับ
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import * as API from "../../utills/api";
export default {
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      overlay: false,
      isError: false
    };
  },
  methods: {
    async deleteJobAction() {
      this.overlay = true;
      const result = await API.jobs.remove(this.job.id);
      if (result.successful) {
        API.processes.notifyCClientToRefreshJobsList(); 
        this.overlay = false;
          // if(!result2.successful){
          //   this.isError = true;
          //   return -1;
          // }
        this.$emit("popup-confirm-delete-job", "yes");
      } else {
        this.isError = true;
      }
      
    },
  },
};
</script>

<style></style>
