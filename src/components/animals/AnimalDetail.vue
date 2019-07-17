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
  import axios from 'axios';

  export default {
    name: "AnimalDetail",
    data() {
      return {
        animal: { }
      }
    },
    methods: {
      getAnimal(id){
        axios
          .get(`http://localhost:3000/api/animal/${id}`)
          .then(response => {
            this.animal = response.data
          })
          .catch((err) => {
            console.log("err",err)
          })
      },
    },
    mounted(){
      const { id } = this.$route.params
      this.getAnimal(id);
    }
  }
</script>
