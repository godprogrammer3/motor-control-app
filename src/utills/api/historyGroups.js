import axios from "axios";
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_HOST+"/history-groups",
    adapter: require("axios/lib/adapters/http"),
    });
    
    export async function listWithHistoryJobs(option){
        var result;
        try{
          result = await instance.get("/list-with-history-jobs",
          {
            params:{
              ...option
            } 
  
          }
          );
          result = result.data;
        }catch(error){
          result = error.response.data;
        }finally{
          return result;
        }
  } 