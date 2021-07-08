import axios from "axios";
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_HOST+"/drives",
    adapter: require("axios/lib/adapters/http"),
    });

export async function list(){
      var result;
      try{
        result = await instance.get("/list");
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 

export async function exportHistoryJobs(data){
  var result;
  try{
    result = await instance.post("/export-history-jobs",data);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 
