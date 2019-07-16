<template>
  <div class="about">
    <h1>Animals</h1>
    <b-button class="my-4" to="/animal/add">Add Animal</b-button>
    <div v-if="isLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <b-table striped hover :fields="fields" :items="animals">
      <template slot="show_details" slot-scope="row">        
        <b-button size="sm" class="mr-2" :to="{ path: '/detail/' + row.item.id }">Details</b-button>
        <b-button size="sm" variant="danger" @click="deleteAnimal(row.item.id)" class="mr-2">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>


<script>
import axios from 'axios';
import { setTimeout } from 'timers';

export default {
  name:"Animal",
  data() {
    return {
      isLoading: true,
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'race', sortable: true },
        { key: 'color_id', sortable: true },
        { key: 'show_details', label: ''},
      ],
      animals: []
    }
  },
  methods: {
    deleteAnimal(id){
      axios
        .delete(`http://localhost:3000/api/animal/${id}`)
        .then(() => {
          const index = this.animals.map(item => item.id).indexOf(id) 
          this.animals.splice(index, 1);
        })
        .catch((err) => {
          console.log("err",err)
        })
    }
  },
  mounted() {
    setTimeout(() => {
      axios
        .get('http://localhost:3000/api/animal')
        .then(response => {
          this.animals = response.data
        })
        .finally(() => {
          this.isLoading = false;
        })
    }, 1000)
  }
}
</script>
