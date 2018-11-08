import Vue from "vue";
import Vuex from "vuex";
import sideBar from "./modules/sideBar";
import getters from "./getters";
import blog from "./modules/blog";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sideBar,
    blog,
    user
  },
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
});
export default store;
