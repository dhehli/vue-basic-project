import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Animal from './views/Animal'
import AnimalList from './components/animals/AnimalList'
import AnimalAddForm from './components/animals/AnimalForm.vue'
import AnimalEditForm from './components/animals/AnimalEditForm.vue'
import AnimalDetail from './components/animals/AnimalDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/animal',
      name: 'animal',
      component: Animal, 
      children: [
        {
          path: '',
          name: 'animallist',
          component: AnimalList
        },
        {
          path: 'add',
          name: 'animaladd',
          component: AnimalAddForm
        },
        {
          path: ':id/detail',
          name: 'animaldetail',
          component: AnimalDetail
        },
        {
          path: ':id/edit',
          name: 'addanimal',
          component: AnimalEditForm
        }
      ]
    },
  ]
})
