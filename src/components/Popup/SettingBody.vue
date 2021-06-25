<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" class="pt-0">
        <v-card width="40vw" height="80vh" style="padding-top:20vh;">
          <v-col align="center" justify="center">
            <v-form ref="form">
<v-row
              align="center"
              justify="center"
              style="padding-left:11vw;padding-right:11vw;"
            >
            <v-col>
              <span class="text-h4 indigo--text">ค่า ONTOP</span>
               <v-text-field
                ref="onTop"
                id="onTop"
                v-model="onTop"
                suffix="เมตร"
                style="transform:scale(2);"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('onTop')"
                @focus="textFieldFocusHandler('onTop')"
                @keydown="(event)=>updateValue(event,'onTop')"
                @keyup="(event)=>enterHandler(event,'onTop')"
                counter
                maxlength="8"
                :rules="onTopRules"
              >
              </v-text-field
            >
            </v-col>
             </v-row>
            <v-row
              align="center"
              justify="center"
              style="padding-left:11vw;padding-right:11vw;margin-top:15vh;"
            >
            <v-col>
              <span class="text-h4 indigo--text">ความเร็วโหมดช้า</span>
              <v-text-field
                ref="slowModeSpeed"
                id="slowModeSpeed"
                v-model="slowModeSpeed"
                suffix="%"
                style="transform:scale(2);"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('slowModeSpeed')"
                @focus="textFieldFocusHandler('slowModeSpeed')"
                @keydown="(event)=>updateValue(event,'slowModeSpeed')"
                @keyup="(event)=>enterHandler(event,'slowModeSpeed')"
                counter
                maxlength="8"
                :rules="slowModeSpeedRules"
              >
              </v-text-field
            >
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
     <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
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
import { mapGetters , mapActions } from "vuex";
import TouchKeyboard from "./TouchKeyboard.vue";
import Popup from "./Popup";
export default {
  components: {
    TouchKeyboard,
    Popup
  },
  data() {
    return {
      currentInput: "",
      onTop: "20",
      onTopRules: [(v) => !!v || "กรุณากรอกค่า ON TOP"],
      slowModeSpeed: "30",
      slowModeSpeedRules: [(v) => !!v || "กรุณากรอกค่าความเร็วโหมดช้า"],
      overlay:false,
      isDialogShow:false,
      dialogValue:'',
      dialogType:''
    };
  },
  mounted() {
    this.overlay = true;
    this.getSetting().then(()=>{
      if(this.getSettingData != undefined){
        this.onTop = this.getSettingData.default_on_top.toString();
        this.slowModeSpeed = this.getSettingData.default_slow_speed.toString();
      }
      
      this.overlay = false;});
  },
  methods: {
    ...mapActions(["getSetting","editSetting"]),
    async keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
          var element;
          if (this.currentInput == "onTop") {
            element = this.$refs.onTop.$el.querySelector("input");
            if( (this.onTop.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.onTop = this.onTop.substring(0,element.selectionStart)+event.value+this.onTop.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          } else if (this.currentInput == "slowModeSpeed") {
            element = this.$refs.slowModeSpeed.$el.querySelector("input");
            if( (this.slowModeSpeed.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.slowModeSpeed = this.slowModeSpeed.substring(0,element.selectionStart)+event.value+this.slowModeSpeed.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          }
           
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            element = this.$refs.onTop.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.onTop = this.onTop.substring(0,element.selectionStart-1)+this.onTop.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.onTop = this.onTop.substring(0,element.selectionStart)+this.onTop.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          } else if (this.currentInput == "slowModeSpeed") {
            element = this.$refs.slowModeSpeed.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.slowModeSpeed = this.slowModeSpeed.substring(0,element.selectionStart-1)+this.slowModeSpeed.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.slowModeSpeed = this.slowModeSpeed.substring(0,element.selectionStart)+this.slowModeSpeed.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
          }
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
             this.overlay = true;
            await this.editSetting({
              on_top: Number(this.onTop),
              slow_speed: Number(this.slowModeSpeed),
            });
    
              this.dialogType = 'saveSettingComplete';
              this.dialogValue = {};
             this.isDialogShow = true;
             this.overlay = false;
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "onTop") {
            this.onTop = '';
          } else if (this.currentInput == "slowModeSpeed") {
            this.slowModeSpeed = '';
          }
        }else if(event.value == 'cancel'){
          this.onTop = this.getSettingData.default_on_top.toString();
          this.slowModeSpeed = this.getSettingData.default_slow_speed.toString();
        }else if(event.value == 'finish'){
         this.dialogValue = {};
         this.isDialogShow = false;
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
    },
     updateValue(event,type){
    var letters;
    if(type == 'onTop' || type=='slowModeSpeed'){
        letters = /^[0-9]$/;
        if( !event.key.match(letters) && event.key != 'Backspace' && event.key!= 'ArrowUp' && event.key!= 'ArrowDown'  && event.key!= 'ArrowLeft' && event.key!= 'ArrowRight' && !event.ctrlKey){
          event.preventDefault();
        }else if(event.key == '0' && event.target.selectionStart == 0){
          event.preventDefault();
        }
      }
    },
    enterHandler(event,type){
      if( event.keyCode == 13){
        var element;
        if(event.target.id == 'onTop'){
          if(this.onTop != ''){
            element = this.$refs.slowModeSpeed.$el.querySelector("input");
            this.$nextTick(() => {
              element.focus();
            });
          }else{
             element = this.$refs.onTop.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }else if(event.target.id == 'slowModeSpeed'){
          if(this.slowModeSpeed != ''){
            this.isDialogShow = true;
          }else {
             element = this.$refs.slowModeSpeed.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }
      }
     
    },
    popupEventHandler(event) {
      if(event.type == 'action'){
        if( event.value == 'finish'){
          this.isDialogShow = false;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getSettingData"])
  },
};
</script>

<style lang="css" scoped></style>
