<template>
<v-container fluid fill-heigh>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
           <v-card width="50vw" >
              <v-row align="center" justify="center">
                <v-col align="center" justify="center" class="text-h3 pa-5">
                    <v-row align="center" justify="center"
                      > <v-icon x-large style="transform:scale(4);margin:2em;" color="green">library_add_check</v-icon
                          >
                    </v-row>
                    <v-row v-if="isPlus" align="center" justify="center"
                      >
                      <span class="green--text mr-4"><v-icon color="green" large>add_circle</v-icon>เพิ่มกระดาษ</span>
                      <span>{{value}} แผ่น เรียบร้อย</span>
                    </v-row>
                    <v-row v-else align="center" justify="center"
                      >
                      <span class="red--text mr-4"><v-icon color="red" large>remove_circle</v-icon>ลดกระดาษ</span>
                      <span>{{value}} แผ่น เรียบร้อย</span>
                    </v-row>
                    <v-row align="center" justify="space-around" class="mt-4">
                      <v-btn
                        class="text-h4 white--text px-10"
                        style="height:auto;width:auto;"
                        color="indigo"
                        @click="$emit('popup-edit-offset-complete-event',{type:'action',value:'ok'})"
                      >
                        ตกลง
                      </v-btn>
                    </v-row>
                  </v-col>
              </v-row>
           </v-card>
      </v-col>
    </v-row>
</v-container>



  
</template>

<script>
export default {
  props: {
    isPlus:{
      type: Boolean,
      default: false
    },
    value:{
      type: String,
      default : ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<style></style>
