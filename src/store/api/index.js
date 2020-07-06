import ElectronAdapter from "axios-electron-adapter";
AxiosStatic.defaults.adapter = ElectronAdapter;
class API {
  constructor() {
    Axios.create({
      baseURL: "http://localhost:3000",
    });
  }
  async getAllJobList() {
    try {
      var result = await Axios.get("/getAllJobList");
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
      var result = await Axios.delete(`/deleteJob/${jobId}`);
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
      var result = await Axios.post("/createJob", job);
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
      var result = await Axios.put("/editJob", job);
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
