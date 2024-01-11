import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contato: null,
  },
  getters: {
    getContato (state) 
    {
      return state.contato;
    }
  },
  mutations: {
    SET_CONTATO(state, payload)
    {
      state.contato = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
