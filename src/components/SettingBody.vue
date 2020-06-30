<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card width="80vw" height="80vh" class="justify-center">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-container>
              <v-row class="mb-5">
                <div style="margin-left:150px;">
                  <span style="margin-right:34px;">ค่า On Top เริ่มต้น :</span>
                  <input
                    class="rounded-lg"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;"
                    :value="onTop"
                    @click="$emit('change-input','onTop')"
                    id="onTop"
                  />
                  <span style="margin-left:20px;">เมตร</span>
                </div>
              </v-row>
              <v-row>
                <div style="margin-left:154px;">
                  <span style="margin-right:20px;">ความเร็วในโหมดช้า :</span>
                  <input
                    class="rounded-lg"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;"
                    :value="slowModeVelocity"
                    @click="$emit('change-input','slowModeVelocity')"
                    id="slowModeVelocity"
                  />
                  <span style="margin-left:20px;">เมตร/นาที</span>
                </div>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    onTop: {
      type: Number,
      value: 30
    },
    slowModeVelocity: {
      type: Number,
      value: 20
    },
    input: {
      type: String,
      value: ""
    }
  }
};
</script>

<style></style>
