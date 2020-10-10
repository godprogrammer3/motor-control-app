<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card width="40vw" height="80vh" class="pa-2">
            <v-col align="center" justify="center">
              <v-row align="center" justify="center">
                <v-text-field
                  ref="jobId"
                  prefix="หมายเลขงาน"
                  :value="jobId"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('jobId')"
                  @focus="textFieldFocusHandler('jobId')"
                  :rules="jobIdRules"
                  required
                >
                </v-text-field
              ></v-row>
              <v-row align="center" justify="center">
                <v-text-field
                  ref="width"
                  prefix="ความกว้าง"
                  :value="width"
                  suffix="เมตร"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('width')"
                  @focus="textFieldFocusHandler('width')"
                  :rules="widthRules"
                  required
                >
                </v-text-field
              ></v-row>
              <v-row align="center" justify="center">
                <v-text-field
                  ref="height"
                  prefix="ความยาว"
                  :value="height"
                  suffix="เมตร"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('height')"
                  @focus="textFieldFocusHandler('height')"
                  :rules="heightRules"
                  required
                >
                </v-text-field
              ></v-row>
              <v-row align="center" justify="center">
                <v-text-field
                  ref="sheet"
                  prefix="จำนวนแผ่น"
                  :value="sheet"
                  suffix="แผ่น"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('sheet')"
                  @focus="textFieldFocusHandler('sheet')"
                  :rules="sheetRules"
                  required
                >
                </v-text-field
              ></v-row>
              <v-row align="center" justify="center">
                <v-text-field
                  ref="workDate"
                  prefix="วันที่ดำเนินงาน"
                  :value="workDate"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('workDate')"
                  @focus="textFieldFocusHandler('workDate')"
                  :rules="workDateRules"
                  required
                >
                </v-text-field
              ></v-row>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
      <v-col class="pt-0"
        ><TouchKeyboard @keyboard-event="keyboardEventHandler"></TouchKeyboard
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import TouchKeyboard from "./TouchKeyboard.vue";
import { mapActions } from "vuex";
export default {
  components: {
    TouchKeyboard,
  },
  data() {
    return {
      jobId: "",
      jobIdRules: [(v) => !!v || "กรุณากรอกหมายเลขงาน"],
      width: "",
      widthRules: [(v) => !!v || "กรุณากรอกความกว้าง"],
      height: "",
      heightRules: [(v) => !!v || "กรุณากรอกความยาว"],
      sheet: "",
      sheetRules: [(v) => !!v || "กรุณากรอกจำนวนแผ่น"],
      workDate: "",
      workDateRules: [(v) => !!v || "กรุณาวันที่ดำเนินงาน"],
      currentInput: "",
      valid: false,
    };
  },
  methods: {
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
        if (this.currentInput == "jobId") {
          this.jobId += event.value;
        } else if (this.currentInput == "width") {
          this.width += event.value;
        } else if (this.currentInput == "height") {
          this.height += event.value;
        } else if (this.currentInput == "sheet") {
          this.sheet += event.value;
        } else if (this.currentInput == "workDate") {
          this.workDate += event.value;
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "jobId") {
            this.jobId = this.jobId.slice(0, -1);
          } else if (this.currentInput == "width") {
            this.width = this.width.slice(0, -1);
          } else if (this.currentInput == "height") {
            this.height = this.height.slice(0, -1);
          } else if (this.currentInput == "sheet") {
            this.sheet = this.sheet.slice(0, -1);
          } else if (this.currentInput == "workDate") {
            this.workDate = this.workDate.slice(0, -1);
          }
        } else if (event.value == "save") {
          console.log("save action");
          if (this.$refs.form.validate()) {
            await this.createJob({
              job_id: this.jobId,
              width: this.width,
              height: this.height,
              length: this.height * this.sheet,
              work_date: this.workDate,
            });
            this.$emit("popup-create-event", {
              type: event.type,
              value: event.value,
            });
          }
        } else {
          this.$emit("popup-create-event", {
            type: event.type,
            value: event.value,
          });
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
      var element;
      if (type == "jobId") {
        element = this.$refs.jobId.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      } else if (type == "width") {
        element = this.$refs.width.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      } else if (type == "height") {
        element = this.$refs.height.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      } else if (type == "sheet") {
        element = this.$refs.sheet.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      } else if (type == "workDate") {
        element = this.$refs.workDate.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      }
    },
    ...mapActions(["createJob"]),
  },
};
</script>

<style></style>
