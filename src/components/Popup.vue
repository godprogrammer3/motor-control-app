<template>
  <div id="Popup">
    <PopupCreateJob
      v-if="type == 'createJob'"
      @popup-create-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupCreateJob>
    <PopupEditJob
      v-else-if="type == 'editJob'"
      :job="value"
      @popup-create-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupEditJob>
    <PopupEditOnTop
      v-else-if="type == 'editOnTop'"
      :onTop="value.onTop.toString()"
      @popup-edit-on-top-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupEditOnTop>
    <PopupEditOffset
      v-else-if="type == 'editOffset'"
      :offset="value.offset.toString()"
      @popup-edit-offset-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupEditOffset>
    <PopupConfirm
      v-else-if="type == 'confirm'"
      :type="value"
      class="align-center"
      @popup-comfirm-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupConfirm>
  </div>
</template>

<script>
import PopupCreateJob from "./PopupCreateJob";
import PopupConfirm from "./PopupConfirm";
import PopupEditJob from "./PopupEditJob";
import PopupEditOnTop from "./PopupEditOnTop";
import PopupEditOffset from "./PopupEditOffset";
export default {
  components: {
    PopupCreateJob,
    PopupConfirm,
    PopupEditJob,
    PopupEditOnTop,
    PopupEditOffset,
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: ()=>{},
    },
  },
};
</script>

<style></style>
