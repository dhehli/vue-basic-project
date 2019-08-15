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
    const { salutation, firstname, lastname, email, password } = payload;

    await axios.post('http://localhost:3000/api/register', {
      query: `mutation createAddress($salutation: ID!, $firstname: String!, $lastname: String!, $email: String!, $password: String!) {
        createAddress(input: {salutation_id: $salutation, firstname: $firstname, lastname: $lastname, email: $email, password: $password}) {
          address_id
          firstname
          lastname
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
}

export default {
  state,
  actions,
  mutations,
  getters
};
