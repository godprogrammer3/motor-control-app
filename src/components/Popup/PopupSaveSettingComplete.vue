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
                    <v-row align="center" justify="center"
                      ><span>บันทึกการตั้งค่าเรียบร้อย</span>
                    </v-row>
                    <v-row align="center" justify="space-around" class="mt-4">
                      <v-btn
                        class="text-h4 white--text px-10"
                        style="height:auto;width:auto;"
                        color="indigo"
                        @click="$emit('popup-save-setting-complete-event',{type:'action',value:'finish'})"
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
