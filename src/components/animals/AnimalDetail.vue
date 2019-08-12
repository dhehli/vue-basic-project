<template>
  <div>
    <h1>Detail Animal</h1>
    <b-button class="my-4" to="/animal">Back</b-button>
    <b-card
      title="Lion"
    >
      <b-card-text>
        <b-list-group>
          <b-list-group-item v-for="(value, property) in animal" v-bind:key="property">
            <strong>{{ property }}</strong> {{ value }}
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
    </b-card>    
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { ANIMAL_FETCH } from '@/store/animals/actions.type'  

  export default {
    name: "AnimalDetail",
    computed: {
      ...mapGetters(['animal'])
    },
    methods: {
      getAnimal(){
        const { id } = this.$route.params
        this.$store.dispatch(ANIMAL_FETCH, id)
      }
    },
    mounted(){      
      this.getAnimal();
    }
  }
</script>
