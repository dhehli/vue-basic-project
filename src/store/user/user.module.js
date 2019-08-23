import axios from '@/helpers/axios'
import router from '@/router'

import { 
  SET_TOKEN,
  DESTROY_TOKEN,
  USER_SET
} from './mutations.type.js'

import { 
  REGISTER_FETCH_ADD,
  LOGIN_FETCH,
  LOGOUT_FETCH,
  USER_FETCH,
  USER_FETCH_UPDATE,
  USER_FETCH_CHANGE_PW
} from './actions.type.js'

const initialState = {
  auth: {
    token: ''
  },
  user: {
    salutation_id: 0,
    firstname: '',
    lastname: '',
    email: '',
  }
}

export const state = { ...initialState }

const getters = {
  isAuthenticated(state){
    return !!state.auth.token;
  },
  user(state){
    return state.user;
  }
}

export const mutations = {
  [SET_TOKEN] (state, token) {
    state.auth.token = token;
  },
  [DESTROY_TOKEN] (state) {
    state.auth.token = '';
  },
  [USER_SET] (state, payload) {
    state.user = payload
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
  async [LOGIN_FETCH] (context, payload){
    const { email, password } = payload;

    const response = await axios.post('http://localhost:3000/api/login', {
      email,
      password
    })

    if(response.status === 200 && response.data && response.data.token){
      context.commit(SET_TOKEN, response.data.token)
      router.push('/member')
    }
  },
  async [LOGOUT_FETCH] (context){
    context.commit(DESTROY_TOKEN)
  },
  async [USER_FETCH] (context){
    const response = await axios.post('http://localhost:3000/member/api/profile', {
        query: `query($address_id: ID!){
          getAddress(input: {address_id: $address_id}){
            nodes{
              salutation_id
              firstname
              lastname
              email
            }
            totalCount
          }
        }`,
        variables: { address_id: '' }
    }) 
    const {data} = response
    context.commit(USER_SET, data)    
  },
  async [USER_FETCH_UPDATE] (context, payload){
    const { salutation_id, firstname, lastname, email } = payload
    const response = await axios.post('http://localhost:3000/member/api/profile', {
      query: `mutation updateAddress($address_id: ID!, $salutation_id: ID!, $firstname: String!, $lastname: String!, $email: String!) {
        updateAddress(input: {address_id: $address_id, salutation_id: $salutation_id, firstname: $firstname, lastname: $lastname, email: $email}) {
          address_id
          salutation_id
          firstname
          lastname
          email
        }
      }`,
      variables: {
        address_id: '',
        salutation_id,
        firstname,
        lastname,
        email
      }
    }) 
    const {data} = response
    context.commit(USER_SET, data)    
  },
  async [USER_FETCH_CHANGE_PW] (context, payload){
    const { password, matchpassword } = payload

    await axios.post('http://localhost:3000/member/api/changepassword', {
      query: `mutation updateAddress($address_id: ID!, $password: String!) {
        updateAddress(input: {address_id: $address_id,password: $password}) {
          address_id
        }
      }`,
      variables: {
        address_id: '',
        password,
        matchpassword
      }
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
};
