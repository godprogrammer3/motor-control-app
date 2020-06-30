<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-toolbar-title class="white--text">กำลังดำเนินงาน...</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" small fab dark color="indigo darken-1" @click="isCloseDialogShow = true">
        <v-icon dark>close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-toolbar>
      <span>หมายเลขงาน</span>
      <v-card width="15vw" class="ma-5 text-center">
        <span>20050384</span>
      </v-card>
      <v-divider class="mx-1" inset vertical></v-divider>
      <span>ความยาว</span>
      <v-card width="15vw" class="ma-5 text-center">
        <span>3684</span>
      </v-card>
      <span>เมตร</span>
    </v-toolbar>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-card width="100%" height="70vh" class="justify-center" elevation="0">
          <v-container class="fill-height">
            <v-row align="center" justify="center">
              <v-container class="fill-height">
                <v-row justify="center">
                  <v-card class="text-center ma-5 white--text" width="20vw" color="teal accent-4">
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">เสร็จสิ้น</p>
                          <p style="font-size:3em;">989</p>
                          <p style="font-size:1.5em;">เมตร</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card class="text-center ma-5 white--text" width="20vw" color="light-blue">
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">คงเหลือ</p>
                          <p style="font-size:3em;">2695</p>
                          <p style="font-size:1.5em;">เมตร</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card class="text-center ma-5 white--text" width="20vw" color="blue accent-4">
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">ทั้งหมด</p>
                          <p style="font-size:3em;">989</p>
                          <p style="font-size:1.5em;">เมตร</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card
                    class="text-center ma-5 white--text"
                    width="20vw"
                    height="20vh"
                    color="deep-purple lighten-2"
                  >
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">เพิ่ม/ลด</p>
                          <p style="font-size:3em;">{{offsetValue>=0?'+'+offsetValue:offsetValue}}</p>
                          <p style="font-size:1.5em;">เมตร</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                    <v-footer color="transparent" absolute>
                      <v-row justify="space-between">
                        <v-spacer></v-spacer>
                        <v-icon large right @click="showEditDialog('offset')">create</v-icon>
                      </v-row>
                    </v-footer>
                  </v-card>
                </v-row>
                <v-row justify="center">
                  <v-card class="text-center ma-5 white--text" width="20vw" color="red lighten-2">
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">ความเร็ว</p>
                          <p style="font-size:3em;">65</p>
                          <p style="font-size:1.5em;">เมตร/นาที</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-card
                    class="text-center ma-5 white--text"
                    width="20vw"
                    color="deep-orange lighten-1"
                  >
                    <v-container class="fill-height">
                      <v-row justify="center" align="center">
                        <v-card-text>
                          <p style="font-size:2em;">On Top</p>
                          <p style="font-size:3em;">{{onTopValue}}</p>
                          <p style="font-size:1.5em;">เมตร</p>
                        </v-card-text>
                      </v-row>
                    </v-container>
                    <v-footer color="transparent" absolute>
                      <v-row justify="space-between">
                        <v-spacer></v-spacer>
                        <v-icon large right @click="showEditDialog('onTop')">create</v-icon>
                      </v-row>
                    </v-footer>
                  </v-card>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
    <v-footer v-show="input == ''" color="transparent" fixed>
      <v-container>
        <v-row justify="space-between">
          <v-card
            class="rounded-xl ma-5"
            :color="isSlowMode ? 'indigo' : 'grey darken-4'"
            @click="isSlowMode = !isSlowMode"
          >
            <v-card-text class="white--text">โหมดช้า</v-card-text>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            class="rounded-xl ma-5"
            :color="isAutoMode ? 'indigo' : 'grey darken-4'"
            @click="isAutoMode = true"
          >
            <v-card-text class="white--text">โหมดอัตโนมัติ</v-card-text>
          </v-card>
          <v-card
            class="rounded-xl ma-5"
            :color="!isAutoMode ? 'indigo' : 'grey darken-4'"
            @click="isAutoMode = false"
          >
            <v-card-text class="white--text">โหมดควบคุมเอง</v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-footer>
    <v-dialog v-model="isShowInserPaper" max-width="290">
      <v-card>
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-icon x-large>note</v-icon>
            <v-card-text class="text-center mt-0">กรุณาใส่กระดาษก่อนกดปุ่ม "เริ่มดำเนินงาน"</v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo white--text" @click="isShowInserPaper = false">เริ่มดำเนินการ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isCloseDialogShow" max-width="290">
      <v-card>
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text class="text-center">ต้องการ "ยกเลิก" งาน 20050384</v-card-text>
            <v-card-text class="text-center mt-0">ใช่หรือไม่</v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isCloseDialogShow = false">ไม่</v-btn>

          <v-btn color="green darken-1" @click="$router.replace('/')">ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isEditDialogShow" max-width="290">
      <v-card>
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text>
              <v-text-field
                :id="editType"
                :label="displayLable"
                :value="editValue"
                @focus="input = editType"
              ></v-text-field>
            </v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isEditDialogShow= false">ยกเลิก</v-btn>

          <v-btn color="green darken-1" @click="saveValue">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
      <v-footer fixed v-show="input != ''">
        <TouchKeyboard :hasSign="input === 'offset'" @key-press="keyPress"></TouchKeyboard>
      </v-footer>
    </v-dialog>
  </div>
</template>

<script>
import TouchKeyboard from "../components/TouchKeyboard.vue";
export default {
  components: {
    TouchKeyboard
  },
  data() {
    return {
      isSlowMode: false,
      isAutoMode: true,
      isShowInserPaper: true,
      isCloseDialogShow: false,
      input: "",
      isEditDialogShow: false,
      editValue: "",
      editType: "",
      offsetValue: 100,
      onTopValue: 30,
      displayLable: ""
    };
  },
  methods: {
    showEditDialog(type) {
      this.editType = type;
      if (type === "offset") {
        this.editValue = this.offsetValue;
        this.displayLable = "เพิ่ม/ลด";
      } else {
        this.editValue = this.onTopValue;
        this.displayLable = "On Top";
      }
      this.isEditDialogShow = true;
    },
    keyPress(key) {
      if (key === "close") {
        this.input = "";
      } else if (key === "del") {
        this.editValue = parseInt((this.editValue + "").slice(0, -1));
        if (isNaN(this.editValue)) {
          this.editValue = 0;
        }
      } else if (key === "+" || key === "-") {
        if (key === "+") {
          this.editValue = Math.abs(this.editValue);
        } else {
          this.editValue = -1 * Math.abs(this.editValue);
        }
      } else {
        this.editValue = parseInt(this.editValue.toString() + key);
      }
    },
    saveValue() {
      if (this.input === "offset") {
        this.offsetValue = this.editValue;
      } else {
        this.onTopValue = this.editValue;
      }
      this.isEditDialogShow = false;
    }
  },
  watch: {
    isEditDialogShow(newValue, oldValue) {
      if (!newValue) {
        this.input = "";
      }
    }
  }
};
</script>

<style></style>
