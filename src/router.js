import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Animal from './views/Animal.vue'
import AnimalForm from './views/AnimalForm.vue'
import AnimalDetail from './views/AnimalDetail.vue'

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
      component: Animal
    },
    {
      path: '/animal/detail/:id',
      name: 'animaldetail',
      component: AnimalDetail
    },
    {
      path: '/animal/add',
      name: 'animaladd',
      component: AnimalForm
    },
    {
      path: '/animal/edit/:id',
      name: 'addanimal',
      component: AnimalForm
    }
  ]
})
