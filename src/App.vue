<template>
  <div id="app">
    <NavHolder />
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
import NavHolder from '@/components/layout/NavHolder'

export default {
  name: 'App',
  components: {
    NavHolder
  }
}
</script>
