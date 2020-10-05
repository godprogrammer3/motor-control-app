<template> </template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      isDisabledDrag: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.handle {
  width: auto;
}
</style>
