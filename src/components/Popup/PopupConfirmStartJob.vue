<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      ><span>ยืนยันที่จะ</span
      ><span class="green--text ml-3">เริ่มงาน</span></v-row
    >
    <v-row align="center" justify="center"
      ><span>กลุ่มหมายเลข</span><span class="ml-3">{{group.id}}</span></v-row
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
export default {
  props: {
    group: {
      type: Object,
      default: ()=>{}
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
    async startWork() {
      this.overlay = true;
      // var result = await this.api.startWork(this.group.group_id);
      
      var result = await this.api.checkHostC(new Date().getTime());  
      console.log(result);
      this.overlay = false;
      if(result.status == 0){
        console.log("Host c is connected.");
        //var result2 = await this.api.initialProcessCheck(this.group.group_id);
        var result2 = {status:0};
        if(result2.status == 0){
          await this.api.startWork(this.group.group_id);
          this.$emit('popup-confirm-start-job', {str:'yes',group:this.group})
        }else if( result2.status == -1){
          console.log('Unknow Error');
          this.errorMessage = 'ข้อผิดพลาดที่ไม่รู้จัก';
          this.isDialogShow = true;
        }else{
          console.log('Error:',result2.data);
          this.errorMessage = result2.data;
          this.isDialogShow = true;
        }
      }else{
        this.errorMessage = 'เครื่อง C ไม่ได้เชื่อมต่อ';
        this.isDialogShow = true;
      }
      
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    test: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
      console.log(data);
    },
  },
};
</script>

<style></style>
