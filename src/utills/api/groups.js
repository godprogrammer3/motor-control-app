import axios from "axios";
var instance = axios.create({
    baseURL: "http://localhost:3000/groups",
    adapter: require("axios/lib/adapters/http"),
    });
export async function listWithJobs(){
      var result;
      try{
        result = await instance.get("/list-with-jobs");
        result = result.data;
      }catch(error){
        result = error.response.data;
      }finally{
        return result;
      }
} 