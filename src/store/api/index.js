import axios from "axios";
class API {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://127.0.0.1:3000",
      adapter: require("axios/lib/adapters/http"),
    });
  }
  async getAllGroup() {
    try {
      var result = await this.instance.get("/getAllGroup");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllJobByAllGroup() {
    try {
      var result = await this.instance.get("/getAllJobByAllGroup");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getAllJobList() {
    try {
      var result = await this.instance.get("/getAllJobList");
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
      var result = await this.instance.delete(`/deleteJob/${jobId}`);
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
      var result = await this.instance.post("/createJob", job);
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
      var result = await this.instance.put("/editJob", job);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getJobListByDate(type, value) {
    try {
      var result = await this.instance.get("/getJobListByDate", {
        params: {
          type: type,
          value: value,
        },
      });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getSetting() {
    try {
      var result = await this.instance.get("/getSetting");
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async editSetting(setting) {
    try {
      var result = await this.instance.put("/editSetting", setting);
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Error : " + result.status);
      }
    } catch (e) {
      console.log(e);
    }
  }

  startWork(work) {
    this.instance.post("/start", work);
  }
  processWork(work) {
    this.instance.post("/process", work);
  }
  stopWork(work) {
    this.instance.post("/stop", work);
  }
  changeTargetWork(target) {
    this.instance.put("/changeTarger", target);
  }
  changeOnTopWork(onTop) {
    this.instance.put("/changeOnTop", onTop);
  }
  setModeWork(mode) {
    this.instance.put("/setMode", mode);
  }
  setSlowWork(isSlow) {
    this.instance.put("/setSlow", isSlow);
  }
}
export default API;
