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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" class="white--text text-h6" @click="showConfirmShutdownPopup">
           ปิดเครื่อง
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <SettingBody></SettingBody>
    <v-dialog v-model="isDialogShow" class="elevation-0" elevation="0" persistent>
      <Popup
        :type="dialogType"
        :value="dialogValue"
        @popup-event="popupEventHandler"
        
      ></Popup>
    </v-dialog>
  </div>
</template>

<script>
import SettingBody from "@/components/SettingBody.vue";
import Popup from "../components/Popup/Popup.vue";
export default {
  components: {
    SettingBody,
    Popup
  },
  data() {
    return {
      drawer: false,
      isDialogShow: false,
      dialogType: {},
      dialogValue: {},
    };
  },
  methods: {
    showConfirmShutdownPopup(){
      this.dialogType = 'confirm',
      this.dialogValue = { str:'confirmShutdown' };
      this.isDialogShow = true;
    },
    popupEventHandler(event){
      if(event.type === 'confirm-shutdown'){
        this.isDialogShow = false;
      }
    }
  },
};
</script>

<style></style>
