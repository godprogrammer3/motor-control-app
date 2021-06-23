import axios from "axios";
var instance = axios.create({
    baseURL: "http://localhost:3000/jobs",
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