<template>
  <v-row align="center" justify="center" style="margin:0;"
    ><v-card width="50vw" style="height:auto;">
      <v-container fluid>
        <v-row align="center" justify="center">
          <PopupConfirmDeleteJob
            v-if="type.str == 'deleteJob'"
            :job="type.value"
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
            :group="type.group"
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
            :group="type.value"
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
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'confirm-insert-paper',
                  value: event,
                });
              }
            "
          ></PopupConfirmInsertPaper>
          <PopupConfirmChangeKnife
            v-else-if="type.str == 'confirmChangeKnife'"
            @popup-confirm-change-knife-event="
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'confirm-change-knife',
                  value: event,
                });
              }
            "
          ></PopupConfirmChangeKnife>
          <PopupConfirmNearFinish
          v-else-if="type.str == 'confirmNearFinish'"
          :group="type.value"
            @popup-confirm-near-finish="
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'confirm-near-finish',
                  value: event,
                });
              }
            "
          >
            
          </PopupConfirmNearFinish>
            <PopupConfirmShutdown
            v-else-if="type.str == 'confirmShutdown'"
            @popup-confirm-shutdown="
              (event) =>
                $emit('popup-comfirm-event', {
                  type: 'confirm-shutdown',
                  value: event,
                })
            "
          ></PopupConfirmShutdown>
          <PopupConfirmFinish
          v-else-if="type.str == 'confirmFinish'"
          :group="type.value"
            @popup-confirm-finish="
              (event) => {
                $emit('popup-comfirm-event', {
                  type: 'confirm-finish',
                  value: event,
                });
              }
            "
          >
            
          </PopupConfirmFinish>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import PopupConfirmDeleteJob from "./PopupConfirmDeleteJob.vue";
import PopupConfirmStartJob from "./PopupConfirmStartJob";
import PopupConfirmCancelJob from "./PopupConfirmCancelJob";
import PopupConfirmInsertPaper from "./PopupConfirmInsertPaper";
import PopupConfirmChangeKnife from "./PopupConfirmChangeKnife";
import PopupConfirmNearFinish from "./PopupConfirmNearFinish.vue"
import PopupConfirmShutdown from './PopupConfirmShutdown.vue';
import PopupConfirmFinish from './PopupConfirmFinish.vue';
export default {
  components: {
    PopupConfirmDeleteJob,
    PopupConfirmStartJob,
    PopupConfirmCancelJob,
    PopupConfirmInsertPaper,
    PopupConfirmChangeKnife,
    PopupConfirmNearFinish,
    PopupConfirmShutdown,
    PopupConfirmFinish 
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
