import axios from '@/helpers/axios'
import router from '@/router'
import Vue from 'vue'

import { 
  SET_TOKEN,
  DESTROY_TOKEN
} from './mutations.type.js'

import { 
  REGISTER_FETCH_ADD,
  LOGIN_FETCH_ADD,
  LOGOUT_FETCH
} from './actions.type.js'


const initialState = {
  user: { }
}

export const state = { ...initialState }

const getters = {
  isAuthenticated(){
    return Vue.prototype.$session.exists();
  },
}

export const mutations = {
  [SET_TOKEN] (state, token) {
    Vue.prototype.$session.start()
    Vue.prototype.$session.set('jwt', token)
  },
  [DESTROY_TOKEN] () {
    Vue.prototype.$session.destroy()
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

    if(response.status === 200 && response.data && response.data.token){
      context.commit(SET_TOKEN, response.data.token)
      router.push('/dashboard')
    }
  },
  async [LOGOUT_FETCH] (context){
    context.commit(DESTROY_TOKEN)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
