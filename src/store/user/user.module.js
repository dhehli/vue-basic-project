import axios from 'axios'
import Vue from 'vue'
import router from '@/router'

import { 
  TEST,
} from './mutations.type.js'

import { 
  REGISTER_FETCH_ADD,
  LOGIN_FETCH_ADD
} from './actions.type.js'


const initialState = {
  user: {
  }
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
    const { salutation, firstname, lastname, email, password } = payload;

    await axios.post('http://localhost:3000/api/register', {
      query: `mutation createAddress($salutation: ID!, $firstname: String!, $lastname: String!, $email: String!, $password: String!) {
        createAddress(input: {salutation_id: $salutation, firstname: $firstname, lastname: $lastname, email: $email, password: $password}) {
         email          
        }
      }`,
      variables: {
        salutation,
        firstname,
        lastname,
        email,
        password
      }
    })
  },
  async [LOGIN_FETCH_ADD] (context, payload){
    const { email, password } = payload;

    const response = await axios.post('http://localhost:3000/api/login', {
      email,
      password
    })


    if (response.status === 200 && 'token' in response.data) {
      Vue.prototype.$session.start()
      Vue.prototype.$session.set('jwt', response.data.token)
      
      router.push('/dashboard')
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
