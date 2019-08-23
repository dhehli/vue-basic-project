<template>
  <div>
    <PublicNav v-if="!isAuthenticated" 
    />
    <MemberNav v-if="isAuthenticated"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PublicNav from '@/components/layout/PublicNav'
import MemberNav from '@/components/layout/MemberNav'

export default {
  name: "NavHolder",
  components: {
    PublicNav,
    MemberNav
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
}
</script>