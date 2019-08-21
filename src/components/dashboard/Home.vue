<template>
  <div>
    <h1>Dashboard</h1>
    <div v-show="isAuthenticated">
      Das ist das if
      {{ this.$store.state.user.user.token}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "@/helpers/axios.js";

export default {
  name:"Home",

  async mounted() {
    try{
      const response = await axios.get('http://localhost:3000/member/api/dashboard');
      console.log("response", response)
    }catch(e){
      console.log("e", e)
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
}
</script>
