<template>
  <v-row align="center" justify="center" style="margin:0;"
    ><v-card width="50vw" style="height:auto;">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" class="text-h3 pa-5">
            <v-row align="center" justify="center">
              <v-icon x-large style="transform:scale(4);margin:2em;">
                usb
              </v-icon>
            </v-row>
            <v-row v-if="usbList.length == 0" align="center" justify="center"
              ><span>ไม่พบ USB</span>
            </v-row>
            <v-row v-else align="center" justify="center"
              ><span>กรุณาเลือก USB</span>
            </v-row>
            <v-row align="center" justify="center">
              <v-radio-group v-model="radioGroup">
                <v-radio
                  v-for="usb in usbList"
                  :key="usb.name"
                  :label="`${usb.path + usb.name}`"
                  :value="usb.path"
                ></v-radio>
              </v-radio-group>
            </v-row>
            <v-row align="center" justify="space-around" class="mt-4">
              <v-btn
                class="text-h4 white--text px-10"
                style="height:auto;width:auto;"
                color="indigo"
                @click="save"
              >
                บันทึก
              </v-btn>
              <v-btn
                class="text-h4 white--text px-10"
                style="height:auto;width:auto;"
                color="grey"
                @click="cancel"
              >
                ยกเลิก
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-overlay :value="overlay"
          ><v-progress-circular
            :size="50"
            color="indigo"
            indeterminate
          ></v-progress-circular
        ></v-overlay>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import API from "@/store/api";
export default {
  props: {
    usbList: Array,
    jobs: Array,
  },
  data() {
    return {
      radioGroup: "",
      overlay: false,
      api: new API(),
    };
  },
  methods: {
    cancel() {
      this.$emit("popup-export-data-event", {
        type: "action",
        value: "cancel",
      });
    },
    async save() {
      this.overlay = true;
      await this.api.saveHistoryToDrive({
        path: this.radioGroup,
        jobs: this.jobs,
      });
      this.overlay = false;
      this.$emit("popup-export-data-event", {
        type: "action",
        value: "cancel",
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
