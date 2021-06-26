import axios from "axios";
import { environtment } from "../../config/environment";
var instance = axios.create({
    baseURL: environtment.API_HOST+"/jobs",
    adapter: require("axios/lib/adapters/http"),
    });
export async function create(job){
      var result;
      try{
        result = await instance.post("/create", job);
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 

export async function remove(id){
  var result;
  try{
    result = await instance.delete(`/remove/${id}`);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 

export async function update(job){
  var result;
  try{
    result = await instance.patch(`/update`,job);
    result = result.data;
  }catch(error){
    result = error.response.data;
  }finally{
    return result;
  }
} 