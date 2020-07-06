import Vue from "vue";
import Vuex from "vuex";
import API from "./api";
const api = new API();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allJobList: [],
  },
  mutations: {
    UPDATE_JOBLIST(state, data) {
      state.allJobList = data;
    },
  },
  actions: {
    async getJobList({ commit }, payload) {
      let result = await api.getAllJobList();
      this.commit("UPDATE_JOBLIST", result);
    },
    async deleteJob({ commit }, payload) {
      let result = await api.deleteJob(payload);
      await this.dispatch("getJobList");
    },
    async createJob({ commit }, payload) {
      let result = await api.createJob(payload);
      await this.dispatch("getJobList");
    },
    async editJob({ commit }, payload) {
      let result = await api.editJob(payload);
      await this.dispatch("getJobList");
    },
  },
  getters: {
    getHistoryJoblist: (state) => {
      let result = [];
      for (var i = 0; i < state.allJobList.length; i++) {
        result.push({
          no: i + 1,
          workNo: state.allJobList[i].jobId,
          length: state.allJobList[i].length,
          offset: state.allJobList[i].overhead,
          total: state.allJobList[i].length + state.allJobList[i].overhead,
          finishedTime: state.allJobList[i].finishedTime,
        });
      }
      return result;
    },
    getJoblist: (state) => {
      let result = [];
      for (var i = 0; i < state.allJobList.length; i++) {
        result.push({
          no: i + 1,
          workNo: state.allJobList[i].jobId,
          length: state.allJobList[i].length,
          workDate: (state.allJobList[i].workTime + "").substring(0, 10),
        });
      }
      return result;
    },
  },
  modules: {},
});
