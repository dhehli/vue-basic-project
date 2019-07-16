import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Animal from './views/Animal.vue'
import AnimalForm from './views/AnimalForm.vue'
import About from './views/About.vue'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/animal',
      name: 'animal',
      component: Animal
    },
    {
      path: '/animal/add',
      name: 'addanimal',
      component: AnimalForm
    },
    {
      path: '/animal/edit/:id',
      name: 'addanimal',
      component: AnimalForm
    }
  ]
})
