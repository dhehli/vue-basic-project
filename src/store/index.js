import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

import { 
  ANIMALS_GET, 
  ANIMAL_GET, 
  ANIMALS_DEL 
} from './mutations.type'

import { 
  ANIMALS_FETCH, 
  ANIMAL_FETCH, 
  ANIMALS_FETCH_ADD,
  ANIMALS_FETCH_UPDATE,
  ANIMALS_FETCH_DEL 
} from './actions.type'

const initialState = {
  animals: [],
  animal: {},
}

export default new Vuex.Store({
  state: { ...initialState },
  getters: {
    animals(state){
      return state.animals;
    },
    animal(state){
      return state.animal;
    }
  },
  mutations: {
    [ANIMALS_GET] (state, payload) {
      state.animals = payload;
    },
    [ANIMAL_GET] (state, payload) {
      state.animal = payload;
    },
    [ANIMALS_DEL] (state, {id}){
      const index = state.animals.map(item => item.id).indexOf(id) 
      state.animals.splice(index, 1)
    },  
  },
  actions: {
    async [ANIMALS_FETCH] (context) {
      const res = await axios.get(`http://localhost:3000/api/animal`)
      const { data } = res
      context.commit(ANIMALS_GET, data)
    },
    async [ANIMAL_FETCH] (context, id){
      const res = await axios.get(`http://localhost:3000/api/animal/${id}`)
      const { data } = res
      context.commit(ANIMAL_GET, data)
    },
    async [ANIMALS_FETCH_ADD] (context, payload){
      await axios.post('http://localhost:3000/api/animal', payload)
    },
    async [ANIMALS_FETCH_UPDATE] ({state}){
      const animal = { ...state.animal }
      const { id } = animal;
      await axios.put(`http://localhost:3000/api/animal/${id}`, animal)
    },
    async [ANIMALS_FETCH_DEL] (context, id) {
      await axios.delete(`http://localhost:3000/api/animal/${id}`)
      context.commit(ANIMALS_DEL, id)
    }
  }
})
