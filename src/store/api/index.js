import axios from "axios";

class API {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
    });
  }
  async getAllJobList() {
    try {
      var result = await this.axiosInstance.get("/getAllJobList");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteJob(jobId) {
    try {
      var result = await this.axiosInstance.delete(`/deleteJob/${jobId}`);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async createJob(job) {
    try {
      var result = await this.axiosInstance.post("/createJob", job);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async editJob(job) {
    try {
      var result = await this.axiosInstance.put("/editJob", job);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
export default API;
