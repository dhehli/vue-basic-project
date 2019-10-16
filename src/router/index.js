import Vue from 'vue'
import Router from 'vue-router'
import { beforeEnter } from '@/router/guardMember'

import Home from '@/views/Home'
import Member from '@/views/Member'

import Animal from '@/views/Animal'
import AnimalList from '@/components/animals/AnimalList'
import AnimalAddForm from '@/components/animals/AnimalAddForm.vue'
import AnimalEditForm from '@/components/animals/AnimalEditForm.vue'
import AnimalDetail from '@/components/animals/AnimalDetail'

import Register from '@/components/user/RegisterForm'
import Login from '@/components/user/LoginForm'
import ForgotPassword from '@/components/user/ForgotPasswordForm'
import ResetPassword from '@/components/user/ResetPasswordForm'

import Dashboard from '@/components/dashboard/Home'
import Profile from '@/components/user/Profile'

import Mandant from '@/views/Mandant'

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
      component: Animal, 
      children: [
        {
          path: '',
          name: 'animal',
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
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgotpassword',
      name: 'Forgot Password',
      component: ForgotPassword
    },
    {
      path: '/resetpassword/:hash',
      name: 'Reset Password',
      component: ResetPassword
    },
    {
      path: '/member',
      component: Member,
      beforeEnter,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },           
      ]
    }, 
    {
      path: '/mandant',
      name: 'Mandant',
      component: Mandant
    }, 
  ]
})