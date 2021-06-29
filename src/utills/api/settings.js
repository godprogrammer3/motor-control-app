import axios from "axios";
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_HOST+"/settings",
    adapter: require("axios/lib/adapters/http"),
    });
    
export async function get(id){
      var result;
      try{
        result = await instance.get("/get/"+id);
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 

export async function update(setting){
    var result;
    try{
      result = await instance.patch("/update",setting);
      result = result.data;
    }catch(error){
      result = error.response.data;
    }finally{
      return result;
    }
} 