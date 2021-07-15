<template>
<v-container fluid fill-heigh >
  <v-row align="center" justify="center">
    <v-card width="20vw" class="mb-5 rounded-xl">
    <v-col align="center" justify="center" class="text-h3 pa-5">
      <v-row align="center" justify="center">
        <v-select
          :items="years"
          v-model="year"
          label="ปี"
          outlined
          :disabled="isYearDisabled"
          @change="yearEventHandler"
        ></v-select>
      </v-row>
      <v-row v-if="type == 'day' || type == 'month'" align="center" justify="center">
        <v-select
          :items="months"
          v-model="month"
          label="เดือน"
          outlined
          :disabled="isMonthDisabled"
          @change="monthEventHandler"
        ></v-select>
      </v-row>
       <v-row v-if="type == 'day'" align="center" justify="center">
         <v-select
          :items="days"
          v-model="day"
          label="วัน"
          outlined
          :disabled="isDayDisabled"
        ></v-select>
      </v-row>
      <v-row>
        <v-col>   
          <v-btn
            color="indigo"
            
            x-large
            bottom
            @click="search()"
            class="text-h5  ma-2 white--text"
            :disabled="canSearch"
          >
            ค้นหา
          </v-btn>
        </v-col>
        <v-col>   
          <v-btn
            color="grey"
            
            x-large
            bottom
            @click="$emit('popup-search-date-event' ,{type:'action',value:'cancel'})"
            class="text-h5  ma-2 white--text"
          >
            ยกเลิก
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
  </v-row>
  <v-overlay :value="overlay"><v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular></v-overlay>
</v-container>
  
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      isYearDisabled: false,  
      isMonthDisabled: true,
      isDayDisabled: true,
      years:[],
      months:[],
      days:[],
      year:null,
      month:null,
      day:null,
      overlay:false,
      api: new API()
    }
  },
  mounted () {
    this.initial();
  },
  methods: {
    async initial() {
      this.overlay = true;
      this.years = await this.api.getAllYearHistory();
      this.overlay = false;
    },
    async yearEventHandler(){
      this.overlay = true;
      this.isMonthDisabled = false;
      this.isDayDisabled = true;
      this.day = null;
      this.month = null;
      this.days = [];
      this.months = await this.api.getAllMonthHistory({year:this.year});
      this.overlay = false;
      
    },
    async monthEventHandler(){
      this.overlay = true;
      this.isDayDisabled = false;
      this.day = null;
      this.days = await this.api.getAllDayHistory({year:this.year,month:this.month});
      this.overlay = false;
      
    },
    async search(){
      this.overlay = true;
      var result;
      if(this.type == 'day'){
        result = await this.api.getHistoryJobByQuery({type:'day',day:this.day,month:this.month,year:this.year}); 
      }else if( this.type == 'month'){
        result = await this.api.getHistoryJobByQuery({type:'month',month:this.month,year:this.year}); 
      }else if( this.type == 'year' ){
        result = await this.api.getHistoryJobByQuery({type:'year', year:this.year}); 
      }
      this.$emit('popup-search-date-event',{type:'search-date',value:{jobs:result,searchBy:this.type,day:this.day,month:this.month,year:this.year}});
      this.overlay = false;
    }
  },
  computed: {
    canSearch() {
      if(this.type == 'day'){
        return !(this.day && this.month && this.year);
      }else if(this.type == 'month'){
        return !(this.month && this.year);
      }else if(this.type == 'year'){
        return !(this.year);
      }
    }
  },
};
</script>

<style></style>
