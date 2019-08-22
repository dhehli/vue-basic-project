<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/member">Vue</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
          <b-nav-item to="/member" exact>Home</b-nav-item>
       
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <LocaleChanger />
        <b-nav-item-dropdown right v-show="isAuthenticated">
          <!-- Using 'button-content' slot -->
          <template slot="button-content">User</template>
          <b-dropdown-item to="/member/profile">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="onLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import LocaleChanger from './LocaleChanger'
import router from '@/router'
import { LOGOUT_FETCH } from '@/store/user/actions.type'

export default {
  name: "MemberNav",
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
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
}
</script>