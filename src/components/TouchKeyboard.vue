<template>
  <v-container class="fill-height">
    <v-row v-if="hasSign" justify="center">
      <v-card
        v-for="(sign,index) in signs"
        :key="'sign'+index"
        class="ma-5"
        @click="$emit('key-press',sign)"
      >
        <v-card-text>{{ sign}}</v-card-text>
      </v-card>
    </v-row>
    <v-row justify="space-around">
      <v-card
        v-for="(digit,index) in digits"
        :key="'digit'+index"
        @click="$emit('key-press',digit)"
      >
        <v-card-text>{{digit}}</v-card-text>
      </v-card>
      <v-card @click="$emit('key-press','del')">
        <v-card-text>
          <v-icon>backspace</v-icon>
        </v-card-text>
      </v-card>
      <v-card @click="$emit('key-press','close')">
        <v-card-text>
          <v-icon>cancel</v-icon>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    hasSign: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      signs: ["+", "-"],
      digits: []
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.digits.push(i + "");
    }
  }
};
</script>

<style>
</style>