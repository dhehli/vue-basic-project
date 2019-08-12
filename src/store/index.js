import Vue from 'vue'
import Vuex from 'vuex'

import animals from './animals/animals.module'
import user from './user/user.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    animals,
    user
  }
})
