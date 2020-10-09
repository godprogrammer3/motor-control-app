<template>
  <v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="30vh" class="pa-2">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <v-text-field
                ref="onTop"
                prefix="ค่า ONTOP"
                suffix="เมตร"
                :value="onTop"
                class="text-h4"
                placeholder="กรอกค่า"
                @click="textFieldFocusHandler('onTop')"
                @focus="textFieldFocusHandler('onTop')"
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
    onTop: {
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
        if (this.currentInput == "onTop") {
          this.onTop += event.value;
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            this.onTop = this.onTop.slice(0, -1);
          }
        } else {
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
  },
};
</script>

<style></style>
