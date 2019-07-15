<template>
  <div class="about">
    <h1>Animals</h1>
    <b-button class="my-4" to="/animal/add">Add Animal</b-button>
    <b-table striped hover :items="animals"></b-table>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name:"Animal",
  data() {
    return {
      animals: []
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/animal')
      .then(response => this.animals = response.data)
  }
}
</script>
