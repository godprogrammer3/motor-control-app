<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-app-bar-nav-icon style="color:white" @click="drawer = true">
        <v-icon large>
          menu
        </v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title style="color:white" class="text-h4"
        >ตั้งค่า</v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary width="30vw">
      <v-list nav>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="$router.replace({ path: '/' })">
            <v-list-item-icon>
              <v-icon large>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6"
              >แผนการดำเนินงาน</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="$router.replace('history')">
            <v-list-item-icon>
              <v-icon large>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ประวัติ</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon large>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-h6">ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <SettingBody></SettingBody>
  </div>
</template>

<script>
import SettingBody from "@/components/SettingBody.vue";
import TouchKeyboard from "../components/Popup/TouchKeyboard.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    SettingBody,
    TouchKeyboard,
  },
  data() {
    return {
      drawer: false,
      onTop: 0,
      slowModeVelocity: 0,
      input: "",
      isSaveDialogShow: false,
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    changeInput(data) {
      this.input = data;
    },
    saveSetting() {
      this.isSaveDialogShow = true;
    },
    saveAction() {
      this.editSetting({
        defaultOnTop: this.onTop,
        defaultSlowModeVelocity: this.slowModeVelocity,
      });
      this.isSaveDialogShow = false;
    },
    cancelAction() {
      this.onTop = this.setting.defaultOnTop;
      this.slowModeVelocity = this.setting.defaultSlowModeVelocity;
      this.isSaveDialogShow = false;
    },
    keyPress(key) {
      if (key == "close") {
        this.input = "";
      } else if (key == "del") {
        if (this.input === "onTop") {
          this.onTop = parseInt(this.onTop.toString().slice(0, -1));
          if (isNaN(this.onTop)) {
            this.onTop = 0;
          }
        } else {
          this.slowModeVelocity = parseInt(
            this.slowModeVelocity.toString().slice(0, -1)
          );
          if (isNaN(this.slowModeVelocity)) {
            this.slowModeVelocity = 0;
          }
        }
      } else {
        if (this.input === "onTop") {
          this.onTop += key;
        } else {
          this.slowModeVelocity += key;
        }
      }
      this.onTop = parseInt(this.onTop);
      this.slowModeVelocity = parseInt(this.slowModeVelocity);
    },
    ...mapActions(["getSetting", "editSetting"]),
    keyboardEventHandler(event) {
      console.log(`Event Type: ${event.type} , Value : ${event.value}`);
    },
  },
  computed: {
    ...mapState(["setting"]),
  },
  watch: {
    setting(newValue, oldValue) {
      this.onTop = this.setting.defaultOnTop;
      this.slowModeVelocity = this.setting.defaultSlowModeVelocity;
    },
  },
};
</script>

<style></style>
