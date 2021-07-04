<template>
<v-container fluid fill-heigh >
  <v-row align="center" justify="center">
    <v-card width="70%" class="mb-5 rounded-xl">
    <v-col align="center" justify="center" class="text-h3 pa-5">
      <v-row>
        <v-spacer></v-spacer><v-btn
        class="mx-2"
        medium
        dark
        fab
        color="red darken-2"
        @click="$emit('popup-job-detail-event', {type:'action',value:'cancel'})"
      >
        <v-icon x-large dark>close</v-icon>
      </v-btn>
      </v-row>
      <v-row align="center" justify="center"
        ><span class="indigo--text">รายละเอียด</span
        ></v-row
      >
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">งานหมายเลข :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.id}}</span> </v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">หน้ากว้าง : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.width}} นิ้ว</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ความยาว : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.height}} มม.</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">จำนวนแผ่น : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.sheet}} แผ่น</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ความยาวงานเดิม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(job.height*job.sheet/100.0).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เพิ่ม/ลดรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.offsetPaper}} แผ่น</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">รวมทั้งสิ้น : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(job.height*(job.sheet+job.offsetPaper)/100.0).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
        <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นเมตรที่ลอน : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.initialWasteLength}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นเมตรที่NC : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.wasteLength}} เมตร</span></v-col> 
      </v-row>
           <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เสียเป็นแผ่นที่NC : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{job.wastePaper}} แผ่น</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">กระดาษเสียรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumWaste(job).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
    </v-col>
  </v-card>
  </v-row>
</v-container>
  
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    sumWaste(job) {
      return job.initialWasteLength + job.wasteLength + (job.wastePaper * job.height / 1000.0)
    }
  },
};
</script>

<style></style>
