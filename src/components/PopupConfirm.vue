<template>
  <v-row align="center" justify="center" style="margin:0;"
    ><v-card width="50vw" style="height:auto;">
      <v-container fluid>
        <v-row align="center" justify="center">
          <PopupConfirmDeleteJob
            v-if="type.str == 'deleteJob'"
            :job='type.value'
            @popup-confirm-delete-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-delete-job',
                  value: event,
                })
            "
          ></PopupConfirmDeleteJob>
          <PopupConfirmStartJob
            v-else-if="type.str == 'startJob'"
            :group='type.group'
            @popup-confirm-start-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-start-job',
                  value: event,
                })
            "
          ></PopupConfirmStartJob>
          <PopupConfirmCancelJob
            v-else-if="type.str == 'cancelJob'"
            @popup-confirm-start-job="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-cancel-job',
                  value: event,
                })
            "
          ></PopupConfirmCancelJob>
          <PopupConfirmInsertPaper
            v-else-if="type.str == 'confirmInsertPaper'"
            @popup-confirm-insert-paper-event="
              (event) =>{
                 $emit('popup-comfirm-event', {
                  type: 'confirm-insert-paper',
                  value: event,
                })
              }
               
            "
          ></PopupConfirmInsertPaper>
        </v-row>
      </v-container> </v-card
  >
  </v-row>
</template>

<script>
import PopupConfirmDeleteJob from "./PopupConfirmDeleteJob.vue";
import PopupConfirmStartJob from "./PopupConfirmStartJob";
import PopupConfirmCancelJob from "./PopupConfirmCancelJob";
import PopupConfirmInsertPaper from "./PopupConfirmInsertPaper";
export default {
  components: {
    PopupConfirmDeleteJob,
    PopupConfirmStartJob,
    PopupConfirmCancelJob,
    PopupConfirmInsertPaper,
  },
  props: {
    type: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
