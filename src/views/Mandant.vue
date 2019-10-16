<template>
  <div class="home">
    <h1>Mandant</h1>
    <button @click="mandantHandler('lb')">Landenberg</button> 
    <button @click="mandantHandler('st')">Stardecor</button>
    <br>
    mandant: {{ getMandant }}<br>
    uri: {{ getGraphqlURI }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_MANDANT } from '@/store/mandant/mutations.type'


export default {
  name: 'mandant',
  computed: {
    ...mapGetters(['getMandant', 'getGraphqlURI'])
  },
  methods: {
    mandantHandler(mandant){
      this.$store.commit(SET_MANDANT, mandant)     
    }
  }
}
</script>
