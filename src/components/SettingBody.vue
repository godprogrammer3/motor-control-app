<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" class="pt-0">
        <v-card width="40vw" height="80vh" style="padding-top:5vh;">
          <v-col align="center" justify="center">
            <v-form ref="form">
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">ความเร็วโหมดช้า</span>
                  <v-text-field
                    ref="slowModeSpeed"
                    id="slowModeSpeed"
                    v-model="slowModeSpeed"
                    suffix="%"
                    style="transform:scale(2);width:40%;"
                    placeholder="กรอกค่า"
                    @click="textFieldFocusHandler('slowModeSpeed')"
                    @focus="textFieldFocusHandler('slowModeSpeed')"
                    @keydown="(event) => updateValue(event, 'slowModeSpeed')"
                    @keyup="(event) => enterHandler(event, 'slowModeSpeed')"
                    counter
                    maxlength="8"
                    :rules="slowModeSpeedRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">ระยะทางลอน A ถึง NC</span>
                  <v-text-field
                    ref="motorAToMotorCutLenght"
                    id="motorAToMotorCutLenght"
                    v-model="motorAToMotorCutLenght"
                    suffix="เมตร"
                    style="transform:scale(2);width:40%;"
                    placeholder="กรอกค่า"
                    @click="textFieldFocusHandler('motorAToMotorCutLenght')"
                    @focus="textFieldFocusHandler('motorAToMotorCutLenght')"
                    @keydown="
                      (event) => updateValue(event, 'motorAToMotorCutLenght')
                    "
                    @keyup="
                      (event) => enterHandler(event, 'motorAToMotorCutLenght')
                    "
                    counter
                    maxlength="8"
                    :rules="motorAToMotorCutLenghtRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text"
                    >ความยาวเตือนปล่อยกระดาษใกล้เสร็จ</span
                  >
                  <v-text-field
                    ref="alertLenghtMotorC"
                    id="alertLenghtMotorC"
                    v-model="alertLenghtMotorC"
                    suffix="เมตร"
                    style="transform:scale(2);width:40%;"
                    placeholder="กรอกค่า"
                    @click="textFieldFocusHandler('alertLenghtMotorC')"
                    @focus="textFieldFocusHandler('alertLenghtMotorC')"
                    @keydown="
                      (event) => updateValue(event, 'alertLenghtMotorC')
                    "
                    @keyup="(event) => enterHandler(event, 'alertLenghtMotorC')"
                    counter
                    maxlength="8"
                    :rules="alertLenghtMotorCRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">ความยาวเผื่อกระดาษ</span>
                  <v-text-field
                    ref="spare"
                    id="spare"
                    v-model="spare"
                    suffix="เมตร"
                    style="transform:scale(2);width:40%;"
                    placeholder="กรอกค่า"
                    @click="textFieldFocusHandler('spare')"
                    @focus="textFieldFocusHandler('spare')"
                    @keydown="(event) => updateValue(event, 'spare')"
                    @keyup="(event) => enterHandler(event, 'spare')"
                    counter
                    maxlength="8"
                    :rules="spareRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-card>
      </v-col>
      <v-col class="pt-0"
        ><TouchKeyboard @keyboard-event="keyboardEventHandler"></TouchKeyboard
      ></v-col>
    </v-row>
    <v-overlay :value="overlay"
      ><v-progress-circular
        :size="50"
        color="indigo"
        indeterminate
      ></v-progress-circular
    ></v-overlay>
    <v-dialog v-model="isDialogShow" elevation="0">
      <Popup
        :type="dialogType"
        :value="dialogValue"
        @popup-event="popupEventHandler"
      ></Popup>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TouchKeyboard from "./Popup/TouchKeyboard.vue";
import Popup from "./Popup/Popup.vue";
import * as API from "../utills/api";
export default {
  components: {
    TouchKeyboard,
    Popup,
  },
  data() {
    return {
      currentInput: "",
      motorAToMotorCutLenght: "",
      motorAToMotorCutLenghtRules: [
        (v) => !!v || "กรุณากรอกค่า ระยะทางลอน A ถึง NC",
      ],
      slowModeSpeed: "",
      slowModeSpeedRules: [(v) => !!v || "กรุณากรอกค่าความเร็วโหมดช้า"],
      overlay: false,
      isDialogShow: false,
      dialogValue: "",
      dialogType: "",
      alertLenghtMotorC: "",
      alertLenghtMotorCRules: [
        (v) => !!v || "กรุณากรอกค่าความยาวเตือนปล่อยกระดาษใกล้เสร็จ",
      ],
      spare: "",
      spareRules: [(v) => !!v || "กรุณากรอกค่าความยาวกระดาษเผื่อ"],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["getSetting", "editSetting"]),
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
        var element;
        if (this.currentInput == "motorAToMotorCutLenght") {
          element = this.$refs.motorAToMotorCutLenght.$el.querySelector(
            "input"
          );
          if (
            (this.motorAToMotorCutLenght.length < 8 ||
              element.selectionStart != element.selectionEnd) &&
            (event.value != "0" || element.selectionStart != 0)
          ) {
            var newSelectionStart = element.selectionStart + 1;
            this.motorAToMotorCutLenght =
              this.motorAToMotorCutLenght.substring(0, element.selectionStart) +
              event.value +
              this.motorAToMotorCutLenght.substring(element.selectionEnd);
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        } else if (this.currentInput == "slowModeSpeed") {
          element = this.$refs.slowModeSpeed.$el.querySelector("input");
          if (
            (this.slowModeSpeed.length < 8 ||
              element.selectionStart != element.selectionEnd) &&
            (event.value != "0" || element.selectionStart != 0)
          ) {
            var newSelectionStart = element.selectionStart + 1;
            this.slowModeSpeed =
              this.slowModeSpeed.substring(0, element.selectionStart) +
              event.value +
              this.slowModeSpeed.substring(element.selectionEnd);
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        } else if (this.currentInput == "alertLenghtMotorC") {
          element = this.$refs.alertLenghtMotorC.$el.querySelector("input");
          if (
            (this.alertLenghtMotorC.length < 8 ||
              element.selectionStart != element.selectionEnd) &&
            (event.value != "0" || element.selectionStart != 0)
          ) {
            var newSelectionStart = element.selectionStart + 1;
            this.alertLenghtMotorC =
              this.alertLenghtMotorC.substring(0, element.selectionStart) +
              event.value +
              this.alertLenghtMotorC.substring(element.selectionEnd);
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        } else if (this.currentInput == "spare") {
          element = this.$refs.spare.$el.querySelector("input");
          if (
            (this.spare.length < 8 ||
              element.selectionStart != element.selectionEnd) &&
            (event.value != "0" || element.selectionStart != 0)
          ) {
            var newSelectionStart = element.selectionStart + 1;
            this.spare =
              this.spare.substring(0, element.selectionStart) +
              event.value +
              this.spare.substring(element.selectionEnd);
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "motorAToMotorCutLenght") {
            element = this.$refs.motorAToMotorCutLenght.$el.querySelector(
              "input"
            );
            var newSelectionStart;
            if (element.selectionStart == element.selectionEnd) {
              newSelectionStart = element.selectionStart - 1;
              this.motorAToMotorCutLenght =
                this.motorAToMotorCutLenght.substring(
                  0,
                  element.selectionStart - 1
                ) + this.motorAToMotorCutLenght.substring(element.selectionEnd);
            } else {
              newSelectionStart = element.selectionStart;
              this.motorAToMotorCutLenght =
                this.motorAToMotorCutLenght.substring(
                  0,
                  element.selectionStart
                ) + this.motorAToMotorCutLenght.substring(element.selectionEnd);
            }
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          } else if (this.currentInput == "slowModeSpeed") {
            element = this.$refs.slowModeSpeed.$el.querySelector("input");
            var newSelectionStart;
            if (element.selectionStart == element.selectionEnd) {
              newSelectionStart = element.selectionStart - 1;
              this.slowModeSpeed =
                this.slowModeSpeed.substring(0, element.selectionStart - 1) +
                this.slowModeSpeed.substring(element.selectionEnd);
            } else {
              newSelectionStart = element.selectionStart;
              this.slowModeSpeed =
                this.slowModeSpeed.substring(0, element.selectionStart) +
                this.slowModeSpeed.substring(element.selectionEnd);
            }
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          } else if (this.currentInput == "alertLenghtMotorC") {
            element = this.$refs.alertLenghtMotorC.$el.querySelector("input");
            var newSelectionStart;
            if (element.selectionStart == element.selectionEnd) {
              newSelectionStart = element.selectionStart - 1;
              this.alertLenghtMotorC =
                this.alertLenghtMotorC.substring(
                  0,
                  element.selectionStart - 1
                ) + this.alertLenghtMotorC.substring(element.selectionEnd);
            } else {
              newSelectionStart = element.selectionStart;
              this.alertLenghtMotorC =
                this.alertLenghtMotorC.substring(0, element.selectionStart) +
                this.alertLenghtMotorC.substring(element.selectionEnd);
            }
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          } else if (this.currentInput == "spare") {
            element = this.$refs.spare.$el.querySelector("input");
            var newSelectionStart;
            if (element.selectionStart == element.selectionEnd) {
              newSelectionStart = element.selectionStart - 1;
              this.spare =
                this.spare.substring(0, element.selectionStart - 1) +
                this.spare.substring(element.selectionEnd);
            } else {
              newSelectionStart = element.selectionStart;
              this.spare =
                this.spare.substring(0, element.selectionStart) +
                this.spare.substring(element.selectionEnd);
            }
            this.$nextTick(() => {
              element.focus();
              element.setSelectionRange(newSelectionStart, newSelectionStart);
            });
          }
        } else if (event.value == "save") {
          this.updateSetting();
        } else if (event.value == "clear") {
          if (this.currentInput == "motorAToMotorCutLenght") {
            this.motorAToMotorCutLenght = "";
          } else if (this.currentInput == "slowModeSpeed") {
            this.slowModeSpeed = "";
          } else if (this.currentInput == "alertLenghtMotorC") {
            this.alertLenghtMotorC = "";
          } else if (this.currentInput == "spare") {
            this.spare = "";
          }
        } else if (event.value == "cancel") {
          this.fetchData();
        } else if (event.value == "finish") {
          this.dialogValue = {};
          this.isDialogShow = false;
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
    },
    updateValue(event, type) {
      var letters;
      if (
        type == "motorAToMotorCutLenght" ||
        type == "slowModeSpeed" ||
        type == "alertLenghtMotorC" ||
        "spare"
      ) {
        letters = /^[0-9]$/;
        if (
          !event.key.match(letters) &&
          event.key != "Backspace" &&
          event.key != "ArrowUp" &&
          event.key != "ArrowDown" &&
          event.key != "ArrowLeft" &&
          event.key != "ArrowRight" &&
          !event.ctrlKey
        ) {
          event.preventDefault();
        } else if (event.key == "0" && event.target.selectionStart == 0) {
          event.preventDefault();
        }
      }
    },
    enterHandler(event, type) {
      if (event.keyCode == 13) {
        var element;
        if (event.target.id == "slowModeSpeed") {
          if (this.slowModeSpeed != "") {
            element = this.$refs.motorAToMotorCutLenght.$el.querySelector(
              "input"
            );
            this.$nextTick(() => {
              element.focus();
            });
          } else {
            element = this.$refs.slowModeSpeed.$el.querySelector("input");
            element.blur();
            this.$nextTick(() => {
              element.focus();
            });
          }
        } else if (event.target.id == "motorAToMotorCutLenght") {
          if (this.motorAToMotorCutLenght != "") {
            element = this.$refs.alertLenghtMotorC.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          } else {
            element = this.$refs.motorAToMotorCutLenght.$el.querySelector(
              "input"
            );
            element.blur();
            this.$nextTick(() => {
              element.focus();
            });
          }
        } else if (event.target.id == "alertLenghtMotorC") {
          if (this.alertLenghtMotorC != "") {
            element = this.$refs.spare.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          } else {
            element = this.$refs.alertLenghtMotorC.$el.querySelector("input");
            element.blur();
            this.$nextTick(() => {
              element.focus();
            });
          }
        } else if (event.target.id == "spare") {
          if (this.spare != "") {
            this.updateSetting();
          } else {
            element = this.$refs.spare.$el.querySelector("input");
            element.blur();
            this.$nextTick(() => {
              element.focus();
            });
          }
        }
      }
    },
    popupEventHandler(event) {
      if (event.type == "action") {
        if (event.value == "finish") {
          this.isDialogShow = false;
        }
      }
    },
    fetchData() {
      this.overlay = true;
      API.settings.get(0).then((response) => {
        this.overlay = false;
        if (response.successful) {
          this.slowModeSpeed = response.data.slowSpeedMotorC.toString();
          this.spare = response.data.spare.toString();
          this.motorAToMotorCutLenght = response.data.motorAToMotorCutLenght.toString();
          this.alertLenghtMotorC = response.data.alertLenghtMotorC.toString();
        } else {
          this.dialogType = "error";
          this.dialogValue = { errorMessage: "กรุณาลองอีกครั้ง" };
          this.isDialogShow = true;
        }
      });
    },
    async updateSetting() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        const result = await API.settings.update({
          id: 0,
          slowSpeedMotorC: Number(this.slowModeSpeed),
          spare: Number(this.spare),
          alertLenghtMotorC: Number(this.alertLenghtMotorC),
          motorAToMotorCutLenght: Number(this.motorAToMotorCutLenght),
        });
        this.overlay = false;
        if (!result.successful) {
          this.dialogType = "error";
          this.dialogValue = { errorMessage: "กรุณาลองอีกครั้ง" };
          this.isDialogShow = true;
          return -1;
        }
        this.dialogType = "saveSettingComplete";
        this.dialogValue = {};
        this.isDialogShow = true;
      }
    },
  },
  computed: {
    ...mapGetters(["getSettingData"]),
  },
};
</script>

<style lang="css" scoped></style>
