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
      @popup-edit-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupEditJob>
    <PopupEditOnTop
      v-else-if="type == 'editOnTop'"
      :oldOnTop="value.onTop.toString()"
      @popup-edit-on-top-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupEditOnTop>
    <PopupEditOffset
      v-else-if="type == 'editOffset'"
      :oldOffset="value.offset.toString()"
      @popup-edit-offset-event="
        (event) =>
          $emit('popup-event', {
            type: event.type,
            value: event.value,
            extraValue: event.extraValue,
          })
      "
    >
    </PopupEditOffset>
    <PopupGroupDetail
      v-else-if="type == 'groupDetail'"
      :group="value"
      @popup-group-detail-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupGroupDetail>
    <PopupJobDetail
      v-else-if="type == 'jobDetail'"
      :job="value"
      @popup-job-detail-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupJobDetail>
    <PopupSearchDate
      v-else-if="type == 'searchDate'"
      :type="value.str"
      @popup-search-date-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    >
    </PopupSearchDate>
    <PopupConfirm
      v-else-if="type == 'confirm'"
      :type="value"
      class="align-center"
      @popup-comfirm-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupConfirm>
    <PopupError
      v-else-if="type == 'error'"
      class="align-center"
      :value="value"
      @popup-error-event="
        (event) =>
          $emit('popup-event', { type: event.type, value: event.value })
      "
    ></PopupError>
    <PopupChangingPaper
      v-else-if="type == 'changingPaper'"
      class="align-center"
    >
    </PopupChangingPaper>
    <PopupSaveSettingComplete
      v-else-if="type == 'saveSettingComplete'"
      class="align-center"
      @popup-save-setting-complete-event="
        (event) => {
          $emit('popup-event', { type: event.type, value: event.value });
        }
      "
    >
    </PopupSaveSettingComplete>
    <PopupEditOffsetComplete
      v-else-if="type == 'editOffsetComplete'"
      class="align-center"
      :isPlus="value.isPlus"
      :value="value.value"
      @popup-edit-offset-complete-event="
        (event) => {
          $emit('popup-event', { type: event.type, value: event.value });
        }
      "
    >
    </PopupEditOffsetComplete>
    <PopupExportData
      v-else-if="type == 'exportData'"
      class="align-center"
      :usbList="value.value"
      :jobs="value.extraValue.jobs"
      @popup-export-data-event="
        (event) => {
          $emit('popup-event', { type: event.type, value: event.value });
        }
      "
    >
    </PopupExportData>
  </div>
</template>

<script>
import PopupCreateJob from "./PopupCreateJob";
import PopupConfirm from "./PopupConfirm";
import PopupEditJob from "./PopupEditJob";
import PopupEditOnTop from "./PopupEditOnTop";
import PopupEditOffset from "./PopupEditOffset";
import PopupGroupDetail from "./PopupGroupDetail";
import PopupJobDetail from "./PopupJobDetail";
import PopupSearchDate from "./PopupSearchDate";
import PopupError from "./PopupError";
import PopupChangingPaper from "./PopupChangingPaper";
import PopupSaveSettingComplete from "./PopupSaveSettingComplete";
import PopupEditOffsetComplete from "./PopupEditOffsetComplete";
import PopupExportData from "./PopupExportData";
export default {
  components: {
    PopupCreateJob,
    PopupConfirm,
    PopupEditJob,
    PopupEditOnTop,
    PopupEditOffset,
    PopupGroupDetail,
    PopupJobDetail,
    PopupSearchDate,
    PopupError,
    PopupChangingPaper,
    PopupSaveSettingComplete,
    PopupEditOffsetComplete,
    PopupExportData,
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
