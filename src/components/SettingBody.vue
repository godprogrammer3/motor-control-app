<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" class="pt-0">
        <v-card width="40vw" height="80vh" style="padding-top:20vh;">
          <v-col align="center" justify="center">
            <v-row
              align="center"
              justify="center"
              style="padding-left:11vw;padding-right:11vw;"
            >
              <v-text-field
                ref="onTop"
                prefix="ค่า ONTOP"
                :value="onTop"
                suffix="เมตร"
                style="transform:scale(2);"
                @click="textFieldFocusHandler('onTop')"
              >
              </v-text-field
            ></v-row>
            <v-row
              align="center"
              justify="center"
              style="padding-left:11vw;padding-right:11vw;margin-top:15vh;"
            >
              <v-text-field
                ref="slowModeSpeed"
                prefix="ความเร็วโหมดช้า"
                :value="slowModeSpeed"
                suffix="%"
                style="transform:scale(2);"
                @click="textFieldFocusHandler('slowModeSpeed')"
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
import { mapState } from "vuex";
import TouchKeyboard from "./TouchKeyboard.vue";
export default {
  components: {
    TouchKeyboard,
  },
  data() {
    return {
      currentInput: "",
      onTop: "20",
      slowModeSpeed: "30",
    };
  },
  mounted() {},
  computed: {
    ...mapState(["setting"]),
  },
  methods: {
    keyboardEventHandler(event) {
      if (event.type == "letter" && event.value != ".") {
        if (this.currentInput == "onTop") {
          this.onTop += event.value;
        } else if (this.currentInput == "slowModeSpeed") {
          this.slowModeSpeed += event.value;
        }
      } else if (event.type == "action") {
        if (event.value == "delete") {
          if (this.currentInput == "onTop") {
            this.onTop = this.onTop.slice(0, -1);
          } else if (this.currentInput == "slowModeSpeed") {
            this.slowModeSpeed = this.slowModeSpeed.slice(0, -1);
          }
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
  },
};
</script>

<style lang="css" scoped></style>
