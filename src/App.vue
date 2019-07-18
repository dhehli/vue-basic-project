<template>
  <div id="app">
    <MainNav />
    <b-container class="bv-example-row mt-5">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

<script>
import MainNav from '@/components/layout/MainNav'

export default {
  name: 'App',
  components: {
    MainNav
  }
}
</script>
