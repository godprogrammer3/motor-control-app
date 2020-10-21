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
                :value="onTop"
                suffix="เมตร"
                style="transform:scale(2);"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('onTop')"
                @keydown="(event)=>updateValue(event,'onTop')"
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
                :value="slowModeSpeed"
                suffix="%"
                style="transform:scale(2);"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('slowModeSpeed')"
                @keydown="(event)=>updateValue(event,'slowModeSpeed')"
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
  </v-container>
</template>

<script>
import { mapGetters , mapActions } from "vuex";
import TouchKeyboard from "./TouchKeyboard.vue";
export default {
  components: {
    TouchKeyboard,
  },
  data() {
    return {
      currentInput: "",
      onTop: "20",
      onTopRules: [(v) => !!v || "กรุณากรอกค่า ON TOP"],
      slowModeSpeed: "30",
      slowModeSpeedRules: [(v) => !!v || "กรุณากรอกค่าความเร็วโหมดช้า"],
      overlay:false
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
           if (this.currentInput == "onTop" && this.onTop.length < 8) {
            if(this.onTop.length != 0){
              this.onTop += event.value;
            }else if(event.value != '0'){
              this.onTop += event.value;
            }
          } else if (this.currentInput == "slowModeSpeed" && this.slowModeSpeed.length < 8) {
            if(this.slowModeSpeed.length != 0){
             this.slowModeSpeed += event.value;
            }else if(event.value != '0'){
             this.slowModeSpeed += event.value;
            }
          }
        
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            this.onTop = this.onTop.slice(0, -1);
          } else if (this.currentInput == "slowModeSpeed") {
            this.slowModeSpeed = this.slowModeSpeed.slice(0, -1);
          } 
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
             this.overlay = true;
            await this.editSetting({
              on_top: Number(this.onTop),
              slow_speed: Number(this.slowModeSpeed),
            });
             this.overlay = false;
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "onTop") {
            this.onTop = '';
          } else if (this.currentInput == "slowModeSpeed") {
            this.slowModeSpeed = '';
          }
        }else {
          this.onTop = this.getSettingData.default_on_top.toString();
          this.slowModeSpeed = this.getSettingData.default_slow_speed.toString();
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
      var element;
      if (type == "onTop") {
        element = this.$refs.onTop.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      } else if (type == "slowModeSpeed") {
        element = this.$refs.slowModeSpeed.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      }
    },
     updateValue(event,type){
      event.preventDefault();
      console.log(event.key);
      var letters;
      if(type == 'onTop' ){
         letters = /^[0-9]$/;
        if(event.key.match(letters) && this.onTop.length < 8){
          if(this.onTop.length != 0){
            this.onTop += event.key;
          }else if(event.key != '0'){
            this.onTop += event.key;
          }
        }else if(event.key == 'Backspace'){
          this.onTop = this.onTop.slice(0, -1)
        }
      }else if(type == 'slowModeSpeed' ){
         letters = /^[0-9]$/;
        if(event.key.match(letters) && this.slowModeSpeed.length < 8){
          if(this.slowModeSpeed.length != 0){
            this.slowModeSpeed += event.key;
          }else if(event.key != '0'){
            this.slowModeSpeed += event.key;
          }
        }else if(event.key == 'Backspace'){
          this.slowModeSpeed = this.slowModeSpeed.slice(0, -1)
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
