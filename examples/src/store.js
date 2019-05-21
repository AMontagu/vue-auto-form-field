import Vue from "vue";
import Vuex from "vuex";
import { vaffStore } from "../../src";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    vaffStore: vaffStore
  }
});
