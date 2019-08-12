import axios from 'axios'

import { 
  TEST,
} from './mutations.type.js'

import { 
  REGISTER_FETCH_ADD
} from './actions.type.js'

const initialState = {
  user: {},
}

export const state = { ...initialState }

const getters = {

}

export const mutations = {
  [TEST] (state, payload) {
    state.animals = payload;
  },
}

export const actions = {
  async [REGISTER_FETCH_ADD] (context, payload){
    console.log("payload", payload)
    await axios.post('http://localhost:3000/api/animal', payload)
  },
}

export default {
  state,
  actions,
  mutations,
  getters
};
