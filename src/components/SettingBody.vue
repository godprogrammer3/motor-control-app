<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card width="90vw" height="80vh" class="justify-center">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-container>
              <v-row class="mb-5">
                <div>
                  <span style="margin-right:34px;" class="text-h4"
                    >ค่า On Top เริ่มต้น :</span
                  >
                  <input
                    class="rounded-lg text-h4"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;"
                    :value="onTop"
                    @click="$emit('change-input', 'onTop')"
                    id="onTop"
                  />
                  <span style="margin-left:20px;" class="text-h4">เมตร</span>
                </div>
              </v-row>
              <v-row>
                <div style="margin-top:2vh;">
                  <span class="text-h4" style="margin-right:6px;"
                    >ความเร็วในโหมดช้า :</span
                  >
                  <input
                    class="rounded-lg text-h4"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;width:33.5vw;"
                    :value="slowModeVelocity"
                    @click="$emit('change-input', 'slowModeVelocity')"
                    id="slowModeVelocity"
                  />
                  <span style="margin-left:20px;" class="text-h4"
                    >เมตร/นาที</span
                  >
                </div>
              </v-row>
              <v-row align="center" justify="center">
                <v-btn
                  style="margin-top:4vh;"
                  color="indigo"
                  class="white--text text-h4"
                  width="20vw"
                  height="8vh"
                  @click="$emit('save-setting')"
                  >บันทึก</v-btn
                >
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    onTop: {
      type: Number,
      value: 30,
    },
    slowModeVelocity: {
      type: Number,
      value: 20,
    },
    input: {
      type: String,
      value: "",
    },
  },
  mounted() {},
  computed: {
    ...mapState(["setting"]),
  },
  methods: {},
};
</script>

<style></style>
