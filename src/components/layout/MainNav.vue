<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Vue</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/animal">Animals</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/forgotpassword">Forgotpassword</b-nav-item>
          <b-nav-item to="/resetpassword/123123">Resetpassword</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <LocaleChanger />
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">User</template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="onLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import LocaleChanger from './LocaleChanger'
import router from '@/router'
import { LOGOUT_FETCH } from '@/store/user/actions.type'

export default {
  name: "MainNav",
  components: {
    LocaleChanger
  },
  methods: {
    onLogout() {
      this.$store.dispatch(LOGOUT_FETCH)
      .then(() => {
        router.push('/')
      })
      .catch(err => {
        console.log("err", err)
      })     
    },    
  }
}
</script>