import Vue from 'vue'
import Vuex from 'vuex'

import animals from './animals/animals.module'
import user from './user/user.module'

import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    animals,
    user
  },
  plugins: [createPersistedState({
    paths: ['user.auth.token'] // Path to state which should be persisted
  })]
})
