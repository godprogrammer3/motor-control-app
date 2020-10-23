<template>
  <v-card width="100%" class="mb-5 rounded-xl">
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
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{group.group_id}}</span> </v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ชนิด :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(group.is_continue)?'กลุ่มต่อเนื่อง':'กลุ่มไม่ต่อเนื่อง'}}</span> </v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">จำนวน :</span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{group.job.length}} งาน</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ความยาวงานรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumWorkLength(group.job).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">เพิ่ม/ลดรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumOffset(group.job).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">รวมทั้งสิ้น : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{(sumWorkLength(group.job)+sumOffset(group.job)).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
      <v-row align="center" justify="center">
       <v-col class="d-flex flex-column justify-end align-end"><span class="indigo--text">ส่วนเกินรวม : </span></v-col>
       <v-col class="d-flex flex-column justify-start align-start"><span class="ml-5">{{sumOverhead(group.job).toFixed(2)}} เมตร</span></v-col> 
      </v-row>
    </v-col>
  </v-card>
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
        sum += element.height * element.sheet / 100.0;
      });
      return sum;
    },
    sumOffset(jobs){
      var sum = 0;
      jobs.forEach(element => {
        sum += element.offset * element.sheet / 100.0;
      });
      return sum;
    },
    sumOverhead(jobs){
      var sum = 0;
      jobs.forEach(element => {
        sum += element.overhead ;
      });
      return sum;
    }
  },
};
</script>

<style></style>
