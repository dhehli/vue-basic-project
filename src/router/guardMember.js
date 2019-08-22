import {store} from '@/store'

export const beforeEnter = (to, from, next) => {
  if(store.state.user.auth.token) {
    next(); // allow to enter route
  } else{
    next('/login'); // go to '/login';
  }
}