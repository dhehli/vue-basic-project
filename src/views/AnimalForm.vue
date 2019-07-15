<template>
  <div>
    <h1>Add Animal</h1>
    <b-button class="my-4" to="/animal">Back</b-button>

    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Name" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Age" label-for="age">
        <b-form-input
          id="age"
          v-model="form.age"
          type="number"
          placeholder="Enter age"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Race" label-for="race">
        <b-form-input
          id="race"
          v-model="form.race"
          placeholder="Enter race"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Color" label-for="color">
        <b-form-select
          id="color_id"
          v-model="form.color_id"
          :options="colors"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          name: '',
          age: null,
          race: '',
        },
        colors: [{ text: 'Select One', value: null }, {value: 1, text: "black"}, {value: 2, text: "white"}, {value: 3, text: "gray"}],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios
          .post('http://localhost:3000/api/animal', this.form)
          .then(response => {
            console.log("res", response)
          })
      }
    }
  }
</script>
