import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    disconnect() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      window.location.reload();
    },
  },
  modules: {
  }
})
