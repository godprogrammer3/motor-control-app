<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card width="80vw" height="80vh" class="justify-center">
        <!-- <v-container fill-height fill-width>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="4">
              <v-row>
                <v-col cols="8">
                  <v-subheader>ค่า On Top เริ่มต้น</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field placeholder="30" suffix="เมตร"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container> -->
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-contianer>
              <v-row class="mb-5">
                <div>
                  <span style="margin-right:34px;">ค่า On Top เริ่มต้น :</span>
                  <input
                    class="rounded-lg"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;"
                    value="30"
                  />
                  <span style="margin-left:20px;">เมตร</span>
                </div>
              </v-row>
              <v-row>
                <div>
                  <span style="margin-right:20px;">ความเร็วในโหมดช้า :</span>
                  <input
                    class="rounded-lg"
                    type="text"
                    style="background-color:#3F51B5;text-align:center;color:white;"
                    value="20"
                  />
                  <span style="margin-left:20px;">เมตร/นาที</span>
                </div>
              </v-row>
            </v-contianer>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
