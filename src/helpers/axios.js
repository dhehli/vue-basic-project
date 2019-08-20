import axios from 'axios'
import Vue from 'vue'

axios.interceptors.request.use(config => {
    const getToken = Vue.prototype.$session.getAll()
    const token = getToken.jwt;

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);

export default axios;