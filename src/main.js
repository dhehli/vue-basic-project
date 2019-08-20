import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueSession from 'vue-session'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import '@/assets/scss/main.scss';
import i18n from './i18n' // https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n

const options = {
  persist: true
}

Vue.use(BootstrapVue)
Vue.use(VueSession, options)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
