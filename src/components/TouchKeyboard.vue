<template>
  <v-container fluid>
    <v-row
      ><v-col style=""
        ><v-card><span>1</span></v-card></v-col
      ><v-col
        ><v-card><span>1</span></v-card></v-col
      ><v-col
        ><v-card><span>1</span></v-card></v-col
      ></v-row
    >
    <v-row
      ><v-col
        ><v-card><span>4</span></v-card></v-col
      ><v-col
        ><v-card><span>8</span></v-card></v-col
      ><v-col
        ><v-card><span>7</span></v-card></v-col
      ></v-row
    >
    <v-row
      ><v-col
        ><v-card><span>1</span></v-card></v-col
      ><v-col
        ><v-card><span>2</span></v-card></v-col
      ><v-col
        ><v-card><span>3</span></v-card></v-col
      ></v-row
    >
    <v-row
      ><v-col
        ><v-card><span>0</span></v-card></v-col
      ><v-col
        ><v-card><span>.</span></v-card></v-col
      ><v-col
        ><v-card><v-icon>backspace</v-icon></v-card></v-col
      ></v-row
    >
    <v-row align="end" justify="end">
      <v-col>
        <v-btn
          color="green darken-1"
          @click="deleteJobAction"
          class="text-h6 white--text"
          width="7vw"
          height="7vh"
          >บันทึก</v-btn
        ></v-col
      >
      <v-col><v-btn
          color="green darken-1"
          @click="deleteJobAction"
          class="text-h6 white--text"
          width="7vw"
          height="7vh"
          >ยกเลิก</v-btn
        ></v-col</v-col>
      ></v-row
    >
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>