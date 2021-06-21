<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"></v-row>
      <v-icon x-large style="transform:scale(4);margin:2em;"
        >settings_applications</v-icon
      >
    </v-row>
    <v-row align="center" justify="center"
      ><span>กรุณาเปลี่ยนใบมีดให้เรียบร้อย</span>
    </v-row>
    <v-row align="center" justify="center"
      ><span>ก่อนกดปุ่มดำเนินการต่อ</span>
    </v-row>
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="changeKnifeCompleted"
      >
        ดำเนินการต่อ
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
</template>

<script>
import { mapActions } from "vuex";
import API from "@/store/api";
export default {
  props: {},
  data() {
    return {
      api: new API(),
      overlay: false,
    };
  },
  methods: {
    async changeKnifeCompleted() {
      this.overlay = true;
      //var result = await this.api.runProcess();
      var result = { status: 0 };
      // await this.api.insertPaperComplete();
      this.overlay = false;
      if (result.status == 0) {
        this.$emit("popup-confirm-change-knife-event", "confirm");
      }
    },
  },
};
</script>

<style></style>
