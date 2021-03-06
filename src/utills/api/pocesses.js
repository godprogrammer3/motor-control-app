import axios from "axios";
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_HOST+"/processes",
    adapter: require("axios/lib/adapters/http"),
    });
export async function checkNCClientConnect(){
      var result;
      try{
        result = await instance.get("/check-nc-client-connect");
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 

export async function notifyNCClientToStartWork(group){
  var result;
  try{
    result = await instance.post("/notify-nc-client-to-start-work",group);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function notifyCClientToCancelWork(){
  var result;
  try{
    result = await instance.get("/notify-c-client-to-cancel-work");
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function notifyCClientToRefreshJobsList(){
  var result;
  try{
    result = await instance.get("/notify-c-client-to-refresh-jobs-list");
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

