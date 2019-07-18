import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/scss/main.scss';
import i18n from './i18n' // https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
