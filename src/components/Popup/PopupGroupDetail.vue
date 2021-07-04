<template>
<v-container fluid fill-heigh >
  <v-row align="center" justify="center">
    <v-card width="60%" class="mb-5 rounded-xl">
    <v-col align="center" justify="center" class="text-h3 pa-5">
      <v-row>
        <v-spacer></v-spacer><v-btn
        class="mx-2"
        medium
        dark
        fab
        color="red darken-2"
        @click="$emit('popup-group-detail-event', {type:'action',value:'cancel'})"
      >
        <v-icon x-large dark>close</v-icon>
      </v-btn>
      </v-row>
      <v-row align="center" justify="center"
        ><span class="indigo--text">รายละเอียด</span
        ></v-row
      >
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">กลุ่มหมายเลข :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{group.id}}</span> </v-col> 
      </v-row>
      <!-- <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ชนิด :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(group.is_continue)?'กลุ่มต่อเนื่อง':'กลุ่มไม่ต่อเนื่อง'}}</span> </v-col> 
      </v-row> -->
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">จำนวน :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{group.history_jobs.length}} งาน</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ความยาวงานเดิม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumWorkLength(group.history_jobs).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เพิ่ม/ลดรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumOffset(group.history_jobs).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">รวมทั้งสิ้น : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(sumWorkLength(group.history_jobs)+sumOffset(group.history_jobs)).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นเมตรที่ลอน : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumInitialWasteLength(group.history_jobs).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นเมตรที่NC : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumWasteLength(group.history_jobs).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
           <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นแผ่นที่NC : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumWastePaper(group.history_jobs).toFixed(0)}} แผ่น</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">กระดาษเสียรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumOverhead(group.history_jobs).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
    </v-col>
  </v-card>
  </v-row>
</v-container>
  
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    sumWorkLength(jobs) {
      var sum = 0;
      jobs.forEach(element => {
        sum += element.height * element.sheet / 1000.0;
      });
      return sum;
    },
    sumOffset(jobs){
      var sum = 0;
      jobs.forEach(element => {
        sum += element.offsetPaper * element.sheet / 1000.0;
      });
      return sum;
    },
    sumInitialWasteLength(jobs){
       var sum = 0;
      jobs.forEach(element => {
        sum += element.initialWasteLength;
      });
      return sum;
    },
    sumWasteLength(jobs){
       var sum = 0;
      jobs.forEach(element => {
        sum += element.wasteLength;
      });
      return sum;
    },
    sumWastePaper(jobs){
       var sum = 0;
      jobs.forEach(element => {
        sum += element.wastePaper;
      });
      return sum;
    },
    sumOverhead(jobs){
      var sum = 0;
      jobs.forEach(element => {
        sum += element.initialWasteLength + element.wasteLength + (element.wastePaper*element.height/1000.0) ;
      });
      return sum;
    }
  },
};
</script>

<style></style>
