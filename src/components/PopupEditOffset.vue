<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-text-field
                ref="offset"
                prefix="เพิ่ม/ลด"
                suffix="เมตร"
                :value="offset"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('offset')"
                @focus="textFieldFocusHandler('offset')"
                style="margin-top:10%;"
              >
              </v-text-field
            ></v-row>
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
    };
  },
  methods: {
    keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
        if (this.currentInput == "offset") {
          this.offset += event.value;
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "offset") {
            this.offset = this.offset.slice(0, -1);
          }
        } else {
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
  },
};
</script>

<style></style>
