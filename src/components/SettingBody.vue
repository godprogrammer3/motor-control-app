<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="40vw" height="80vh" style="padding-top:20vh;">
          <v-col align="center" justify="center">
            <v-row
              align="center"
              justify="center"
              style="padding-left:15vw;padding-right:15vw;"
            >
              <v-text-field
                label="ค่า ONTOP"
                value="20"
                suffix="เมตร"
                style="transform:scale(3);"
              >
              </v-text-field
            ></v-row>
            <v-row
              align="center"
              justify="center"
              style="padding-left:15vw;padding-right:15vw;margin-top:15vh;"
            >
              <v-text-field
                label="ความเร็วโหมดช้า"
                value="30"
                suffix="%"
                style="transform:scale(3);"
              >
              </v-text-field
            ></v-row>
          </v-col>
        </v-card>
      </v-col>
      <v-col><TouchKeyboard></TouchKeyboard></v-col>
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
  props: {
    onTop: {
      type: Number,
      value: 30,
    },
    slowModeVelocity: {
      type: Number,
      value: 20,
    },
    input: {
      type: String,
      value: "",
    },
  },
  mounted() {},
  computed: {
    ...mapState(["setting"]),
  },
  methods: {},
};
</script>

<style lang="css" scoped></style>
