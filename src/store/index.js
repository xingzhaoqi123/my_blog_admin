import Vue from "vue";
import Vuex from "vuex";
import sideBar from "./modules/sideBar";
import getters from "./getters";
import blog from "./modules/blog";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sideBar,
    blog
  },
  getters
});
export default store;
