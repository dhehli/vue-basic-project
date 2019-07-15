<template>
  <div class="about">
    <h1>Animals</h1>
    <b-button class="my-4" to="/animal/add">Add Animal</b-button>
    <div v-if="isLoading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <b-table striped hover :items="animals"></b-table>
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
      animals: []
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
