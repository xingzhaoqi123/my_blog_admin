const sideBar = {
  state: {
    ifShow: true
  },
  mutations: {
    TURN_SHOW(state, payload) {
      state.ifShow = payload;
    }
  },

  actions: {
    sideBar_show({ commit }, isShow) {
      commit("TURN_SHOW", isShow);
    }
  }
};
export default sideBar;
