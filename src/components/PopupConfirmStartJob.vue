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
        @click="startWork"
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
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
    <v-dialog v-model="isDialogShow">
      <v-card width="50vw" style="margin-left:24.4%;">
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center">
              <span>Error </span>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import API from "@/store/api";
export default {
  props: {
    group: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {
      api: new API(),
      overlay:false,
      isDialogShow:false
    }
  },
  methods: {
    async startWork() {
      this.overlay = true;
      console.log(this.group.group_id);
      // var result = await this.api.startWork(this.group.group_id);
      var result = 0;
      this.overlay = false;
      if(result.status == 0 || 1){
        this.$emit('popup-confirm-start-job', {str:'yes',group:this.group})
      }else if( result.status == -1){
        console.log('Unknow Error');
        this.isDialogShow = true;
      }else{
        console.log('Error:',result.data);
        this.isDialogShow = true;
      }
    }
  },
};
</script>

<style></style>
