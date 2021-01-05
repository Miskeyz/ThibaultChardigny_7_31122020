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
    formVerif(regex, message, input, error) {
      if(regex.test(input.value))
      {
          error.textContent = '';
          input.classList.add('green-border');
          console.log('ça marche ?');
      }
      else
      {
          input.classList.remove('green-border');
          error.textContent = message;
      }
    },
  },
  modules: {
  }
})
