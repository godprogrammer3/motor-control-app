<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <v-app-bar-nav-icon style="color:white" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title style="color:white">รายการงาน</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-card color="indigo darken-1" :date="datenow" style="padding:5px;">
        <span style="margin:5px;color:white;">{{ datenow }}</span>
        <v-icon color="white">date_range</v-icon>
      </v-card>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group color="indigo darken-4">
          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>format_list_numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-title>รายการงาน</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('history')">
            <v-list-item-icon>
              <v-icon>history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ประวัติ</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.replace('setting')">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ตั้งค่า</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <HomeJobList @show-dialog="showDialog"></HomeJobList>
    <v-btn
      color="indigo"
      dark
      absolute
      bottom
      :style="{ left: '50%', transform: 'translateX(-50%)' }"
    >
      <v-icon>control_point</v-icon>เพิ่มงาน
    </v-btn>
    <v-dialog v-model="isDialogShow" max-width="290">
      <v-card v-if="dialogInfo.type === 'delete'">
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text class="text-center">ต้องการ "ลบ" งาน 20050384</v-card-text>
            <v-card-text class="text-center mt-0">ใช่หรือไม่</v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isDialogShow = false">ไม่</v-btn>

          <v-btn color="green darken-1" @click="isDialogShow = false">ใช่</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="dialogInfo.type === 'edit'">
        <v-card class="pa-5" elevation="0">
          <v-text-field label="หมายเลขงาน" value="20050285"></v-text-field>
          <v-text-field label="ความยาว" value="1024" suffix="เมตร"></v-text-field>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1 white--text" @click="isDialogShow = false">ยกเลิก</v-btn>

          <v-btn color="green darken-1 white--text" @click="isDialogShow = false">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="dialogInfo.type === 'operate'">
        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-card-text class="text-center">ต้องการ "เริ่ม" งาน 20050384</v-card-text>
            <v-card-text class="text-center mt-0">ใช่หรือไม่</v-card-text>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" @click="isDialogShow = false">ไม่</v-btn>

          <v-btn color="green darken-1" @click="$router.replace('/operating')">ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import HomeJobList from "@/components/HomeJobList.vue";
import Setting from "@/views/Setting.vue";
export default {
  components: {
    HomeJobList
  },
  data() {
    return {
      isDialogShow: false,
      dialogInfo: {},
      datenow: "",
      lists: [],
      drawer: false
    };
  },
  methods: {
    date() {
      this.datenow = moment().format("DD/M/YYYY");
    },
    showDialog(data) {
      this.isDialogShow = true;
      this.dialogInfo = data;
      console.log(data);
    }
  },
  mounted() {
    this.datenow = moment().format("DD/M/YYYY");
    this.interval = setInterval(this.date, 1800000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
