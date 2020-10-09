<template>
  <div>
    <PopupCreateJob
      v-if="type == 'createJob'"
      @popup-create-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupCreateJob>
    <PopupEditJob
      v-else-if="type == 'editJob'"
      :jobId="value.job_id.toString()"
      @popup-create-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupEditJob>
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
("");
export default {
  components: {
    PopupCreateJob,
    PopupConfirm,
    PopupEditJob,
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: "",
    },
  },
};
</script>

<style></style>
