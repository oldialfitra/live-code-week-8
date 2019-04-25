/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
    },
  },
  mutations: {
    changeLoggedIn(state, payload) {
      state.user.isLoggedIn = payload;
    },
  },
  actions: {
    logInOut(context, payload) {
      context.commit('changeLoggedIn', payload);
    },
  },
});
