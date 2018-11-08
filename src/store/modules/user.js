const user = {
  state: {
    userInfo: {},
    token: ""
  },
  mutations: {
    GET_USERINFO(state, payload) {
      state.userInfo = payload;
      sessionStorage.userinfo = payload;
    },
    // GET_EXIT(state) {
    //   state.userInfo = {};
    //   sessionStorage.removeItem("userinfo");
    // },
    GET_TOKEN(state, payload) {
      state.token = payload;
    },
    DEL_TOKEN(state) {
      state.token = "";
      state.userInfo = {};
      sessionStorage.removeItem("userinfo");
    }
  },

  actions: {
    get_userinfo({ commit }, userinfo) {
      commit("GET_USERINFO", userinfo);
    },
    // get_exit({ commit }) {
    //   commit("GET_EXIT");
    // },
    get_token({ commit }, token) {
      commit("GET_TOKEN", token);
    },
    remove_token({ commit }) {
      commit("DEL_TOKEN");
    }
  }
};
export default user;
