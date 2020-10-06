<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="6"></v-col>
      <v-col clos="6"><TouchKeyboard></TouchKeyboard></v-col>
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

<style></style>
