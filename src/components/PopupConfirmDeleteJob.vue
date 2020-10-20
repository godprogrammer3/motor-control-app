<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span><span class="red--text ml-3">ลบงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>หมายเลข</span><span class="ml-3">{{job.job_id}}</span></v-row
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
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
  </v-col>
</template>

<script>
import { mapActions} from "vuex";
export default {
  props: {
    job: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {
      overlay: false
    }
  },
  methods: {
    ...mapActions(["deleteJob"]),
    async deleteJobAction() {
      this.overlay = true;
      await this.deleteJob({job_id:this.job.job_id});
      this.overlay = false;
      this.$emit('popup-confirm-delete-job', 'yes')
    }
  },
};
</script>

<style></style>
