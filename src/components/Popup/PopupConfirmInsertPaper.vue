<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      > <v-icon x-large style="transform:scale(4);margin:2em;">note</v-icon
          >
    </v-row>
    <v-row align="center" justify="center"
      ><span>กำลังใส่กระดาษ</span>
    </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
        <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="grey"
        @click="cancelJob"
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
export default {
  props: {
  },
  data() {
    return {
      api:new API(),
      overlay:false,
      
    }
  },
  methods: {
    async startWork(){
      this.overlay = true;
      //var result = await this.api.runProcess();
      var result = { status: 0};
      this.overlay = false;
      if(result.status == 0){
        this.$emit('popup-confirm-insert-paper-event','confirm');
      }
    },
    async cancelJob(){
      this.overlay = true;
      var result = await this.api.cancelJob();
      this.overlay = false;
      if(result.status == 0){
        this.$emit('popup-confirm-insert-paper-event','cancel')
      }
    }
  },
};
</script>

<style></style>
