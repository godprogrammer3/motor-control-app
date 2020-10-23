<template>
  <v-col align="center" justify="center" class="text-h3 pa-5">
    <v-row align="center" justify="center"
      > <v-icon x-large style="transform:scale(4);margin:2em;">note</v-icon
          >
    </v-row>
    <v-row align="center" justify="center"
      ><span>ใส่กระดาษให้เรียบร้อย</span>
    </v-row>
    <v-row align="center" justify="center"
      ><span>ก่อนกดปุ่มเริ่มดำเนินงาน</span></v-row
    >
    <v-row align="center" justify="space-around" class="mt-4">
      <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="indigo"
        @click="$emit('popup-confirm-insert-paper-event','confirm')"
      >
        เริ่มดำเนินการ
      </v-btn>
        <v-btn
        class="text-h4 white--text px-10"
        style="height:auto;width:auto;"
        color="grey"
        @click="$emit('popup-confirm-insert-paper-event','cancel')"
      >
        ยกเลิก
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions} from "vuex";
export default {
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<style></style>
