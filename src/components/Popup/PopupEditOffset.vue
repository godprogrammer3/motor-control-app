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
                      value="true"
                      style="transform:scale(1.5);margin-left:5vw;margin-right:10vw;"
                      color="green"
                    >
                    <span slot="label" class="green--text">เพิ่ม  
                    <v-icon color="green" large>
                      add_circle
                    </v-icon>
                    </span>
                  
                    </v-radio>
                    <v-radio
                      value="false"
                      style="transform:scale(1.5);"
                      color="red"
                    >
                    <span slot="label" class="red--text">
                      ลด
                      <v-icon color="red" large>
                      remove_circle
                    </v-icon>
                      </span>
                    </v-radio>
                  </v-radio-group>
                  <v-text-field
                ref="offset"
                id="offset"
                suffix="แผ่น"
                v-model="offset"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('offset')"
                @focus="textFieldFocusHandler('offset')"
                counter
                maxlength="8"
                :rules="offsetRules"
                @keydown="(event)=>updateValue(event,'offset')"
                @keyup="(event)=>enterHandler(event,'offset')"
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
    oldOffset: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentInput: "",
      radioGroup: true,
      offsetRules:[(v) => !!v || "กรุณากรอกค่าเพิ่ม/ลด"],
      offset:''
    };
  },
  methods: {
    async keyboardEventHandler(event) {
    var element;
     if (event.type == "letter" ) {
         if (this.currentInput == "offset") {
            element = this.$refs.offset.$el.querySelector("input");
            if( (this.offset.length < 8 || element.selectionStart != element.selectionEnd) && (event.value != '0' || element.selectionStart != 0)){
              var newSelectionStart = element.selectionStart + 1;
              this.offset = this.offset.substring(0,element.selectionStart)+event.value+this.offset.substring(element.selectionEnd);
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
            }
          }
        
      } else if (event.type == "action") {
        if (event.value == "delete") {
           if (this.currentInput == "offset") {
            element = this.$refs.offset.$el.querySelector("input");
            var newSelectionStart;
              if( element.selectionStart == element.selectionEnd){
                newSelectionStart = element.selectionStart - 1;
                this.offset = this.offset.substring(0,element.selectionStart-1)+this.offset.substring(element.selectionEnd);
              }else{
                newSelectionStart = element.selectionStart;
                this.offset = this.offset.substring(0,element.selectionStart)+this.offset.substring(element.selectionEnd);
              }
              this.$nextTick(() => {
                element.focus();
                element.setSelectionRange(newSelectionStart, newSelectionStart);
              });
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
              value: 'saveOffset',
              extraValue: {
                isPlus:this.radioGroup == 'true',
                value:this.offset
              }
            });
          }
        } else if(event.value == "clear" ){
          if (this.currentInput == "offset") {
            this.offset = '';
          } 
        }else {
          this.offset = this.oldOffset;
          this.$emit("popup-edit-offset-event", {
            type: event.type,
            value: event.value
          });
        }
      }
    },
    textFieldFocusHandler(type) {
      this.currentInput = type;
    },
    updateValue(event,type){
      var letters;
      if(type == 'offset'){
          letters = /^[0-9]$/;
          if( !event.key.match(letters) && event.key != 'Backspace' && event.key!= 'ArrowUp' && event.key!= 'ArrowDown'  && event.key!= 'ArrowLeft' && event.key!= 'ArrowRight' && !event.ctrlKey){
            event.preventDefault();
          }else if(event.key == '0' && event.target.selectionStart == 0){
            event.preventDefault();
          }
      }
    },
    ...mapActions(["changeOffsetWork"]),
    enterHandler(event,type){
      if( event.keyCode == 13){
        var element;
        if(event.target.id == 'offset'){
          if(this.offset != ''){
            console.log('save');
          }else{
             element = this.$refs.offset.$el.querySelector("input");
             element.blur();
             this.$nextTick(() => {
              element.focus();
             });
          }
        }
      }
    },
  },
  mounted () {
    this.offset = this.oldOffset;
  },
}
</script>

<style></style>
