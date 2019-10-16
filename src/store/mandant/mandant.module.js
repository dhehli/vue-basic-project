import { 
  SET_MANDANT
} from './mutations.type.js'

import { 
} from './actions.type.js'

const initialState = {
  mandant: {
    abbreviation: "lb",
    graphqlURI: "http://landenberg.ch"
  }
}

export const state = { ...initialState }

const getters = {
  getMandant(state){
    return state.mandant.abbreviation;
  },
  getGraphqlURI(state){
    return state.mandant.graphqlURI;
  }
}

export const mutations = {
  [SET_MANDANT] (state, mandant) {
    state.mandant.abbreviation = mandant;
    state.mandant.graphqlURI = mandant === "lb" ? 'http://landenberg.ch':'http://stardecor.ch'
  }
}

export const actions = {
  
}

export default {
  state,
  actions,
  mutations,
  getters
};
