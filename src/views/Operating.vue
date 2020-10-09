<template>
  <div>
    <v-app-bar color="indigo darken-4" style="height:70px" flat>
      <span class="white--text text-h4 mr-5">กลุ่มที่ 1</span>
      <v-toolbar-title class="white--text text-h4"
        >กำลังดำเนินงาน...</v-toolbar-title
      >
      <span class="white--text text-h4 ml-5">80%</span>
      <span class="white--text text-h4 ml-5">(8/10 งาน)</span>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        medium
        dark
        fab
        color="red darken-2"
        @click="cancelJob()"
      >
        <v-icon x-large dark>close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container fluid class="pa-0">
      <v-row class="elevation-2 pl-10">
        <v-col
          v-for="(col, index) in headers"
          :key="index"
          :cols="col.col_size"
        >
          <span class="text-h6"> {{ col.text + "  " + col.data }}</span>
        </v-col>
      </v-row>
      <v-container>
        <v-row align="center" justify="center"
          ><v-col
            ><v-card color="green" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">เสร็จสิ้น</v-row
                ><v-row align="center" justify="center">189</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ><v-col
            ><v-card color="indigo darken-4" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">คงเหลือ</v-row
                ><v-row align="center" justify="center">2659</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ><v-col
            ><v-card color="purple" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ทั้งหมด</v-row
                ><v-row align="center" justify="center">3348</v-row
                ><v-row align="center" justify="center">เมตร</v-row></v-col
              ></v-card
            ></v-col
          ></v-row
        >
        <v-row align="center" justify="center"
          ><v-col
            ><v-card color="red" class="text-h4 white--text"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ความเร็ว</v-row
                ><v-row align="center" justify="center">65</v-row
                ><v-row align="center" justify="center">เมตร/นาที</v-row></v-col
              ></v-card
            ></v-col
          >
          <v-col
            ><v-card
              color="orange"
              class="text-h4 white--text"
              @click="editOnTop"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">ON TOP</v-row
                ><v-row align="center" justify="center">30</v-row
                ><v-row align="center" justify="center"
                  ><span class="mr-5">เมตร</span>
                  <v-icon x-large color="white">
                    create
                  </v-icon></v-row
                ></v-col
              ></v-card
            ></v-col
          >
          <v-col
            ><v-card
              color="blue"
              class="text-h4 white--text"
              @click="editOffset"
              ><v-col align="center" justify="center"
                ><v-row align="center" justify="center">เพิ่ม/ลด</v-row
                ><v-row align="center" justify="center">+100</v-row
                ><v-row align="center" justify="center"
                  ><span class="mr-5">เมตร</span>
                  <v-icon x-large color="white">
                    create
                  </v-icon></v-row
                ></v-col
              ></v-card
            ></v-col
          ></v-row
        >
      </v-container>
      <v-row align="center" justify="center" class="pl-10">
        <v-col justify="center" style="width;100%;">
          <v-btn
            color="indigo"
            dark
            x-large
            bottom
            @click="isShowHomePopup = true"
            class="text-h5"
          >
            แผนการดำเนินงาน
          </v-btn>
        </v-col>
        <v-col justify="center" style="width;100%;">
          <v-switch
            style="transform:scale(1.3);"
            v-model="isNotSlowMode"
            inset
            :label="isNotSlowMode ? 'โหมดเร็ว' : 'โหมดช้า'"
            color="green"
          ></v-switch>
        </v-col>
        <v-col justify="center" style="width;100%;">
          <v-switch
            style="transform:scale(1.3);"
            v-model="isAutoMode"
            inset
            :label="isAutoMode ? 'โหมดอัตโนมัติ' : 'โหมดแมนนวล'"
            color="green"
          ></v-switch>
        </v-col>
      </v-row>
      <footer class="elevation-2 pl-10" fixed absolute>
        <v-row align="center" justify="center"
          ><span class="text-h6">งานต่อไป</span></v-row
        >
        <v-row>
          <v-col
            v-for="(col, index) in headers"
            :key="index"
            :cols="col.col_size"
          >
            <span class="text-h6"> {{ col.text + "  " + col.data + "1" }}</span>
          </v-col></v-row
        >
      </footer>
      <v-dialog v-model="isDialogShow" elevation="0">
        <Popup
          :type="dialogType"
          :value="dialogValue"
          @popup-event="popupEventHandler"
        ></Popup>
      </v-dialog>
      <v-dialog v-model="isShowHomePopup" elevation="0">
        <PopupHome @popup-event="popupEventHandler"></PopupHome>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Popup from "@/components/Popup.vue";
import PopupHome from "@/components/PopupHome.vue";
export default {
  components: {
    Popup,
    PopupHome,
  },
  data() {
    return {
      isSlowMode: false,
      isAutoMode: true,
      isNotSlowMode: true,
      isAutoMode: true,
      isCloseDialogShow: false,
      input: "",
      isEditDialogShow: false,
      editValue: "",
      editType: "",
      offsetValue: 100,
      onTopValue: 30,
      displayLable: "",
      speed: 0,
      headers: [
        {
          text: "หมายเลขงาน",
          col_size: 3,
          data: "1234",
        },
        {
          text: "กว้าง",
          col_size: 2,
          data: "20",
        },
        {
          text: "ยาว",
          col_size: 2,
          data: "30",
        },
        {
          text: "จำนวนแผ่น",
          col_size: 2,
          data: "50",
        },
        {
          text: "ความยาวรวม",
          col_size: 3,
          data: "300",
        },
      ],
      items: [
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: true,
        },
        {
          data: [{ job_id: 127, job_length: 500, job_work_date: "5/09/63" }],
          isContinue: true,
        },
        {
          data: [
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
            { job_id: 127, job_length: 500, job_work_date: "5/09/63" },
          ],
          isContinue: false,
        },
      ],
      isDragableDisabled: false,
      isDialogShow: false,
      dialogType: "",
      dialogValue: "",
      onTop: 30,
      offset: 100,
      isShowHomePopup: false,
    };
  },
  methods: {
    showEditDialog(type) {
      this.editType = type;
      if (type === "offset") {
        this.editValue = this.offsetValue;
        this.displayLable = "เพิ่ม/ลด";
      } else {
        this.editValue = this.onTopValue;
        this.displayLable = "On Top";
      }
      this.isEditDialogShow = true;
    },
    keyPress(key) {
      if (key === "close") {
        this.input = "";
      } else if (key === "del") {
        this.editValue = parseInt((this.editValue + "").slice(0, -1));
        if (isNaN(this.editValue)) {
          this.editValue = 0;
        }
      } else if (key === "+" || key === "-") {
        if (key === "+") {
          this.editValue = Math.abs(this.editValue);
        } else {
          this.editValue = -1 * Math.abs(this.editValue);
        }
      } else {
        this.editValue = parseInt(this.editValue.toString() + key);
      }
    },
    saveValue() {
      if (this.input === "offset") {
        this.offsetValue = this.editValue;
      } else {
        this.onTopValue = this.editValue;
      }
      this.isEditDialogShow = false;
    },
    process() {
      this.processWork();
      this.isShowInserPaper = false;
    },
    stop() {
      this.stopWork();
      this.$router.replace("/");
    },
    cancelJob() {
      this.dialogType = "confirm";
      this.dialogValue = { str: "cancelJob" };
      this.isDialogShow = true;
    },
    popupEventHandler(event) {
      if (event.type == "confirm-cancel-job") {
        if (event.value == "cancel") {
          this.isDialogShow = false;
        } else if (event.value == "yes") {
          this.$router.replace("/");
        }
      } else if (event.type == "action") {
        if (event.value == "save" || event.value == "cancel") {
          this.isDialogShow = false;
        }
      } else if (event.type == "popup-home") {
        if (event.value == "close") {
          this.isShowHomePopup = false;
        }
      }
    },
    editOnTop() {
      this.dialogType = "editOnTop";
      this.dialogValue = { onTop: this.onTop };
      this.isDialogShow = true;
    },
    editOffset() {
      this.dialogType = "editOffset";
      this.dialogValue = { offset: this.offset };
      this.isDialogShow = true;
    },
    openPopupHome() {
      this.dialogType = "openPopupHome";
      this.dialogValue = null;
      this.isDialogShow = true;
    },
    ...mapActions(["processWork", "stopWork"]),
  },
  watch: {
    isEditDialogShow(newValue, oldValue) {
      if (!newValue) {
        this.input = "";
      }
    },
  },
  props: {
    groupId: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // socket.on("Speed2", function(msg) {
    //   this.speed = msg;
    // });
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    test: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
      console.log(data);
    },
  },
};
</script>

<style></style>
