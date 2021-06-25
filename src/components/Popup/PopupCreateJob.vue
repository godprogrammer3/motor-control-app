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
                  id="jobId"
                  v-model="jobId"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  :rules="jobIdRules"
                  required
                  style="text-align: center"
                  @click="textFieldFocusHandler('jobId')"
                  @focus="textFieldFocusHandler('jobId')"
                  @keydown="(event)=>updateValue(event,'jobId')"
                  @keyup="(event)=>enterHandler(event,'jobId')"
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
                  id="width"
                  v-model="width"
                  suffix="นิ้ว"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('width')"
                  @focus="textFieldFocusHandler('width')"
                  :rules="widthRules"
                  required
                  @keydown="(event)=>updateValue(event,'width')"
                  @keyup="(event)=>enterHandler(event,'width')"
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
                  id="height"
                  v-model="height"
                  suffix="มม."
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('height')"
                  @focus="textFieldFocusHandler('height')"
                  :rules="heightRules"
                  required
                  @keydown="(event)=>updateValue(event,'height')"
                  @keyup="(event)=>enterHandler(event,'height')"
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
                  id='sheet'
                  v-model="sheet"
                  suffix="แผ่น"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="textFieldFocusHandler('sheet')"
                  @focus="textFieldFocusHandler('sheet')"
                  :rules="sheetRules"
                  required
                  @keydown="(event)=>updateValue(event,'sheet')"
                  @keyup="(event)=>enterHandler(event,'sheet')"
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
                  id="workDate"
                  :value="workDate"
                  class="text-h4"
                  placeholder="กรอกค่า"
                  @click="showDatePicker = true"
                  :rules="workDateRules"
                  required
                  @keydown="(event)=>updateValue(event,'workDate')"
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
    <v-dialog v-model="showDatePicker" width="100vw" height>
      <v-container>
        <v-row> <v-date-picker v-model="picker" width="35vw" locale="th" style="transform:scale(1.1);margin-left:18vw;margin-bottom:5vh;"></v-date-picker></v-row>
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
     <v-dialog v-model="isDialogShow" elevation="0">
      <PopupError
        :value="dialogValue"
        @popup-error-event="popupEventHandler"
      ></PopupError>
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
import * as api from "../../utills/api";
import PopupError from './PopupError.vue';
export default {
  components: {
    TouchKeyboard,
    PopupError,
  },
  data() {
    return {
      jobId: "",
      jobIdRules: [(v) => !!v || "กรุณากรอกหมายเลขงาน",(v) => v.length <= 20 || 'ความยาวตัวอักษรสูงสุด 20 ตัว'],
      width: "",
      widthRules: [(v) => !!v || "กรุณากรอกหน้ากว้าง"],
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
      isDialogShow: false,
      dialogValue: {}

    };
  },
  methods: {
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
          var element;  
          if (this.currentInput == "jobId") {
            element = this.$refs.jobId.$el.querySelector("input");
            if( this.jobId.length < 20 || element.selectionStart != element.selectionEnd ){
              var newSelectionStart = element.selectionStart + 1;
              this.jobId = this.jobId.substring(0,element.selectionStart)+event.value+this.jobId.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          } else if (this.currentInput == "width") {
            element = this.$refs.width.$el.querySelector("input");
            if( (this.width.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.width = this.width.substring(0,element.selectionStart)+event.value+this.width.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          } else if (this.currentInput == "height") {
            element = this.$refs.height.$el.querySelector("input");
            if( (this.height.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.height = this.height.substring(0,element.selectionStart)+event.value+this.height.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          } else if (this.currentInput == "sheet") {
            element = this.$refs.sheet.$el.querySelector("input");
            if( (this.sheet.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.sheet = this.sheet.substring(0,element.selectionStart)+event.value+this.sheet.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          }
        
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "jobId") {
            element = this.$refs.jobId.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.jobId = this.jobId.substring(0,element.selectionStart-1)+this.jobId.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.jobId = this.jobId.substring(0,element.selectionStart)+this.jobId.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          } else if (this.currentInput == "width") {
            element = this.$refs.width.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.width = this.width.substring(0,element.selectionStart-1)+this.width.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.width = this.width.substring(0,element.selectionStart)+this.width.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          } else if (this.currentInput == "height") {
            element = this.$refs.height.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.height = this.height.substring(0,element.selectionStart-1)+this.height.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.height = this.height.substring(0,element.selectionStart)+this.height.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          } else if (this.currentInput == "sheet") {
            element = this.$refs.sheet.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.sheet = this.sheet.substring(0,element.selectionStart-1)+this.sheet.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.sheet = this.sheet.substring(0,element.selectionStart)+this.sheet.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          }
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
            this.overlay = true;
            const result = await api.jobs.create({
              id: this.jobId,
              width: Number(this.width),
              height: Number(this.height),
              sheet:Number(this.sheet),
              workDate: this.deParseDate(this.workDate)+' 00:00:00',
            });
            this.overlay = false;
            if(result.successful){
              this.$emit("popup-create-event", {
                type: event.type,
                value: event.value,
              });
            }else{
              if( result.errorCode == '03'){
                this.dialogValue = {errorMessage:'หมายเลขงานซ้ำกับที่มีอยู่ในระบบแล้ว'};
                this.isDialogShow = true;
              }
            }
           
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
      var letters;
      if(type == 'jobId'){
        letters = /^[0-9a-zA-Z\u0E00-\u0E7F]$/;
        if( !event.key.match(letters) && event.key != 'Backspace' && event.key!= 'ArrowUp' && event.key!= 'ArrowDown'  && event.key!= 'ArrowLeft' && event.key != 'ArrowRight' && !event.ctrlKey){
          event.preventDefault();
        }
      }else if(type == 'width' || type=='height' || type=='sheet' ){
        letters = /^[0-9]$/;
        if( !event.key.match(letters) && event.key != 'Backspace' && event.key!= 'ArrowUp' && event.key!= 'ArrowDown'  && event.key!= 'ArrowLeft' && event.key!= 'ArrowRight' && !event.ctrlKey){
          event.preventDefault();
        }else if(event.key == '0' && event.target.selectionStart == 0){
          event.preventDefault();
        }
      }else if( type == 'workDate'){
        event.preventDefault();
      }
      
    },
    enterHandler(event,type){
      if( event.keyCode == 13){
        var element;
        if(event.target.id == 'jobId'){
          if(this.jobId != ''){
            element = this.$refs.width.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          }else{
             element = this.$refs.jobId.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }else if(event.target.id == 'width'){
          if(this.width != ''){
            element = this.$refs.height.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          }else{
             element = this.$refs.width.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }else if(event.target.id == 'height'){
          if(this.height != ''){
            element = this.$refs.sheet.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          }else{
             element = this.$refs.height.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }else if(event.target.id == 'sheet'){
          if(this.sheet != ''){
            element = this.$refs.workDate.$el.querySelector("input");
            this.$nextTick(() => {
              element.click();
            });
          }else{
             element = this.$refs.sheet.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }
      }
     
    },
    popupEventHandler(event){
       if (event.type == "action") {
         if(event.value === 'cancel'){
           this.isDialogShow = false;
         }
       }
    }
  },
};
</script>

<style lang="scss" scoped>
 @import '~vuetify/src/components/VDatePicker/_variables.scss';
 $date-picker-years-font-size:100px !important;
</style>
