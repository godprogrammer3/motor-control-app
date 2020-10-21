<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-form ref="form">
                <v-col>
                  <span class="text-h4 indigo--text">เพิ่ม/ลด</span>
                  <v-radio-group
                    v-model="radioGroup"
                    row
                    :mandatory="true"
                  >
                    <v-radio
                      label="เพิ่ม +"
                      value="true"
                      style="transform:scale(1.5);margin-left:5vw;margin-right:10vw;"
                      color="green"
                    ></v-radio>
                    <v-radio
                      label="ลด -"
                      value="false"
                      style="transform:scale(1.5);"
                      color="red"
                    ></v-radio>
                  </v-radio-group>
                  <v-text-field
                ref="offset"
                suffix="แผ่น"
                :value="offset"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('offset')"
                @focus="textFieldFocusHandler('offset')"
                counter
                maxlength="8"
                :rules="offsetRules"
                @keydown="(event)=>updateValue(event,'offset')"
              >
              </v-text-field
            >
                </v-col>
                
              </v-form>
              </v-row>
          </v-col>
        </v-card>
      </v-col>
      <v-col class="pt-0"
        ><TouchKeyboard @keyboard-event="keyboardEventHandler"></TouchKeyboard
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import TouchKeyboard from "./TouchKeyboard.vue";
import {mapActions} from "vuex";
export default {
  components: {
    TouchKeyboard,
  },
  props: {
    offset: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentInput: "",
      radioGroup: true,
      offsetRules:[(v) => !!v || "กรุณากรอกค่าเพิ่ม/ลด"],
    };
  },
  methods: {
    async keyboardEventHandler(event) {
     if (event.type == "letter" ) {
          if (this.currentInput == "offset" && this.offset.length < 8) {
            if(this.offset.length != 0){
             this.offset += event.value;
            }else if(event.value != '0'){
             this.offset += event.value;
            }
          } 
        
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "offset") {
            this.offset = this.offset.slice(0, -1);
          } 
        } else if (event.value == "save") {
          if (this.$refs.form.validate()) {
             this.overlay = true;
            await this.changeOffsetWork({
              offset:this.offset,
            });
            this.overlay = false;
            this.$emit("popup-edit-offset-event", {
              type: event.type,
              value: event.value,
            });
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "offset") {
            this.offset = '';
          } 
        }else {
          this.$emit("popup-edit-offset-event", {
            type: event.type,
            value: event.value,
          });
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
      var element;
      if (type == "offset") {
        element = this.$refs.offset.$el.querySelector("input");
        this.$nextTick(() => {
          element.setSelectionRange(element.value.length, element.value.length);
        });
      }
    },
    updateValue(event,type){
      event.preventDefault();
      var letters;
      if(type == 'offset' ){
          letters = /^[0-9]$/;
          if(event.key.match(letters) && this.offset.length < 8){
            if(this.offset.length != 0){
              this.offset += event.key;
            }else if(event.key != '0'){
              this.offset += event.key;
            }
          }else if(event.key == 'Backspace'){
            this.offset = this.offset.slice(0, -1)
          }
      }
    },
    ...mapActions(["changeOffsetWork"])
  }
}
</script>

<style></style>
