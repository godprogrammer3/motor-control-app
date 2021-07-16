<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span class="red--text">งานกลุ่มหมายเลข</span><span class="ml-3">{{group.id}}</span></v-row
    >
    <v-row align="center" justify="center"><span>ปล่อยกระดาษเสร็จสิ้นแล้ว</span> </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text"
        style="height:auto;width:auto;"
        color="grey"
        @click="confirmFinish"
      >
        ยืนยันกลุ่มงานเสร็จสิ้น
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
          <v-col align="center" justify="center" class="text-h3">
              <span class="red--text">เกิดข้อผิดพลาดในการดำเนินการ</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center" class="text-h3">
              <span>{{errorMessage}}</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center"> 
          <v-col align="center" justify="center">
               <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="isDialogShow = false"
      >
        ย้อนกลับ
      </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import * as API from '../../utills/api';
export default {
  props: {
    group: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      overlay:false,
      isDialogShow:false,
      errorMessage:''
    }
  },
  methods: {
    async confirmFinish(){
      this.overlay = true;
      let result = await API.controls.confirmFinishGroupJob();
      console.log('-> DEBUG : This line in confirmFinish()');
      console.log('result :',result);
      this.overlay = false;
      if( !result.successful ){
        this.isDialogShow = true;
        return -1;
      }
      this.$emit('popup-confirm-finish','yes');
    }
  },
};
</script>

<style></style>
