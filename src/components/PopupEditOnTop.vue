<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-col>
                <v-form ref="form">
                  <span class="text-h4 indigo--text">ค่า ON TOP</span>
                <v-text-field
                ref="onTop"
                suffix="เมตร"
                :value="onTop"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('onTop')"
                @focus="textFieldFocusHandler('onTop')"
                style="margin-top:10%;"
                counter
                maxlength="8"
                :rules="onTopRules"
                @keydown="(event)=>updateValue(event,'onTop')"
              >
              </v-text-field
            >
                </v-form>
                
              </v-col>
              </v-row>
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
import { mapActions } from 'vuex';
import TouchKeyboard from "./TouchKeyboard.vue";
export default {
  components: {
    TouchKeyboard,
  },
  props: {
    onTop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentInput: "",
      onTopRules:[(v) => !!v || "กรุณากรอกค่า ON TOP"],
      overlay:false
    };
  },
  methods: {
    async keyboardEventHandler(event) {
      if (event.type == "letter" ) {
          if (this.currentInput == "onTop" && this.onTop.length < 8) {
            if(this.onTop.length != 0){
             this.onTop += event.value;
            }else if(event.value != '0'){
             this.onTop += event.value;
            }
          } 
        
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            this.onTop = this.onTop.slice(0, -1);
          } 
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
             this.overlay = true;
            await this.changeOnTopWork({
              on_top:this.onTop,
            });
            this.overlay = false;
            this.$emit("popup-edit-on-top-event", {
              type: event.type,
              value: event.value,
            });
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "onTop") {
            this.onTop = '';
          } 
        }else {
          this.$emit("popup-edit-on-top-event", {
            type: event.type,
            value: event.value,
          });
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
      }
    },
    updateValue(event,type){
      event.preventDefault();
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
    }
  },
    ...mapActions(["changeOnTopWork"])
  },
};
</script>

<style></style>
