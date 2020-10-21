<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card width="40vw" height="85vh" class="pa-2">
            <v-col align="center" justify="center">
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">หมายเลขงาน</span>
                  <v-text-field
                  ref="jobId"
                  :value="jobId"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('jobId')"
                  @focus="textFieldFocusHandler('jobId')"
                  :rules="jobIdRules"
                  required
                  style="text-align: center"
                  @keydown="(event)=>updateValue(event,'jobId')"
                  counter
                  maxlength="20"
                >
                </v-text-field>
                </v-col>
                
              </v-row>
              <v-row align="center" justify="center">
                <v-col>   
                  <span class="text-h4 indigo--text">หน้ากว้าง</span>
                   <v-text-field
                  ref="width"
                  :value="width"
                  suffix="ซม."
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('width')"
                  @focus="textFieldFocusHandler('width')"
                  :rules="widthRules"
                  required
                  @keydown="(event)=>updateValue(event,'width')"
                  counter
                  maxlength="8"
                >
                </v-text-field
              >
                </v-col>
               </v-row>
              <v-row align="center" justify="center">
                <v-col>
                   <span class="text-h4 indigo--text">ความยาว</span>
                   <v-text-field
                  ref="height"
                  :value="height"
                  suffix="ซม."
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('height')"
                  @focus="textFieldFocusHandler('height')"
                  :rules="heightRules"
                  required
                  @keydown="(event)=>updateValue(event,'height')"
                  counter
                  maxlength="8"
                >
                </v-text-field
              >
                </v-col>
               </v-row>
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">จำนวนแผ่น</span>
                  <v-text-field
                  ref="sheet"
                  :value="sheet"
                  suffix="แผ่น"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('sheet')"
                  @focus="textFieldFocusHandler('sheet')"
                  :rules="sheetRules"
                  required
                  @keydown="(event)=>updateValue(event,'sheet')"
                  counter
                  maxlength="8"
                >
                </v-text-field
              >
                </v-col>
               </v-row>
              <v-row align="center" justify="center">
                <v-col>
                  <span class="text-h4 indigo--text">วันที่ดำเนินงาน</span>
                  <v-text-field
                  ref="workDate" 
                  :value="workDate"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="showDatePicker = true"
                  :rules="workDateRules"
                  required
                >
                </v-text-field
              >
                </v-col>
                </v-row>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
      <v-col class="pt-0"
        ><TouchKeyboard @keyboard-event="keyboardEventHandler"></TouchKeyboard
      ></v-col>
    </v-row>
    <v-dialog v-model="showDatePicker" width="20vw">
      <v-container>
        <v-row> <v-date-picker v-model="picker" width="20vw" locale="th"></v-date-picker></v-row>
         <v-row justify="center">
           <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="saveDate()"
          class="text-h5 ma-2"
        >
          บันทึก
        </v-btn>
           <v-btn
          color="indigo"
          dark
          x-large
          bottom
          @click="cancelDate()"
          class="text-h5  ma-2"
        >
          ยกเลิก
        </v-btn>
        </v-row>
      </v-container>
     
    </v-dialog>
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
  </v-container>
</template>

<script>
import TouchKeyboard from "./TouchKeyboard.vue";
import { mapActions } from "vuex";
import moment from "moment";
export default {
  components: {
    TouchKeyboard,
  },
  data() {
    return {
      jobId: "",
      jobIdRules: [(v) => !!v || "กรุณากรอกหมายเลขงาน",(v) => v.length <= 20 || 'ความยาวตัวอักษรสูงสุด 20 ตัว'],
      width: "",
      widthRules: [(v) => !!v || "กรุณากรอกความกว้าง"],
      height: "",
      heightRules: [(v) => !!v || "กรุณากรอกความยาว"],
      sheet: "",
      sheetRules: [(v) => !!v || "กรุณากรอกจำนวนแผ่น"],
      workDate: this.parseDate(new Date().toISOString().substr(0, 10)),
      workDateRules: [(v) => !!v || "กรุณากรอกวันที่ดำเนินงาน"],
      currentInput: "",
      valid: false,
      picker: new Date().toISOString().substr(0, 10),
      showDatePicker : false,
      overlay: false,
    };
  },
  methods: {
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
          if (this.currentInput == "jobId" && this.jobId.length < 20) {
            this.jobId += event.value;
          } else if (this.currentInput == "width" && this.width.length < 8) {
            if(this.width.length != 0){
              this.width += event.value;
            }else if(event.value != '0'){
              this.width += event.value;
            }
          } else if (this.currentInput == "height" && this.height.length < 8) {
            if(this.height.length != 0){
             this.height += event.value;
            }else if(event.value != '0'){
             this.height += event.value;
            }
          } else if (this.currentInput == "sheet" && this.sheet.length < 8) {
            if(this.sheet.length != 0){
              this.sheet += event.value;
            }else if(event.value != '0'){
              this.sheet += event.value;
            }
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
          if (this.$refs.form.validate()) {
             this.overlay = true;
            await this.createJob({
              job_id: this.jobId,
              width: Number(this.width),
              height: Number(this.height),
              sheet:Number(this.sheet),
              work_date: this.deParseDate(this.workDate)+' 00:00:00',
            });
             this.overlay = false;
            this.$emit("popup-create-event", {
              type: event.type,
              value: event.value,
            });
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "jobId") {
            this.jobId = '';
          } else if (this.currentInput == "width") {
            this.width = '';
          } else if (this.currentInput == "height") {
            this.height = '';
          } else if (this.currentInput == "sheet") {
            this.sheet = '';
          } else if (this.currentInput == "workDate") {
            this.workDate = '';
          }
        }else {
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
    parseDate(date){
      let part = date.split('-');
      return part[2]+'/'+part[1]+'/'+part[0];
    },
    deParseDate(date){
      let part = date.split('/');
      return part[2]+'-'+part[1]+'-'+part[0];
    },
    saveDate(){
      this.workDate = this.parseDate(this.picker) ;
      this.showDatePicker = false;
    },
    cancelDate(){
      this.picker = this.deParseDate(this.workDate);
      this.showDatePicker = false;
    },
    updateValue(event,type){
      event.preventDefault();
      var letters;
      if(type == 'jobId' ){
        letters = /^[0-9a-zA-Z]$/;
        if(event.key.match(letters) && this.jobId.length < 20){
           this.jobId += event.key;
        }else if(event.key == 'Backspace'){
          this.jobId = this.jobId.slice(0, -1)
        }
      }else if(type == 'width' ){
         letters = /^[0-9]$/;
        if(event.key.match(letters) && this.width.length < 8){
          if(this.width.length != 0){
            this.width += event.key;
          }else if(event.key != '0'){
            this.width += event.key;
          }
        }else if(event.key == 'Backspace'){
          this.width = this.width.slice(0, -1)
        }
      }else if(type == 'height' ){
         letters = /^[0-9]$/;
        if(event.key.match(letters) && this.height.length < 8){
          if(this.height.length != 0){
            this.height += event.key;
          }else if(event.key != '0'){
            this.height += event.key;
          }
        }else if(event.key == 'Backspace'){
          this.height = this.height.slice(0, -1)
        }
      }else if(type == 'sheet' ){
         letters = /^[0-9]$/;
        if(event.key.match(letters)  && this.sheet.length < 8){
          if(this.sheet.length != 0){
            this.sheet += event.key;
          }else if(event.key != '0'){
            this.sheet += event.key;
          }
        }else if(event.key == 'Backspace'){
          this.sheet = this.sheet.slice(0, -1)
        }
      }
    }
  },
};
</script>

<style></style>
