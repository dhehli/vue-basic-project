<template>
  <div>
    <h1>Edit Animal</h1>
    <b-button class="my-4" to="/animal">Back</b-button>

    <b-alert variant="success" v-if="isDone" show>
     Animal edited
    </b-alert>

    <div v-for="error in errors" v-bind:key="error.msg">
      <b-alert variant="danger" show>
        {{error.msg}} for field {{error.param}}
      </b-alert>
    </div>

    <b-form @submit="onSubmit" v-if="showForm">
      <b-form-group id="input-group-1" label="Name" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
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

      <b-button type="submit" variant="primary" v-if="!isSubmitting">Submit</b-button>
      <b-button type="submit" disabled variant="primary" v-if="isSubmitting">
        <b-spinner small label="Loading..."></b-spinner>
      </b-button>
      
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "AnimalEditForm",
    data() {
      return {
        showForm: true,
        isSubmitting: false,
        isDone: false,
        errors: [],
        form: {
          name: '',
          age: null,
          race: ''
        },
        colors: [{ text: 'Select One', value: null }, {value: 1, text: "black"}, {value: 2, text: "white"}, {value: 3, text: "gray"}],
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.isSubmitting = true;
        this.errors = [];
        this.$emit('clickedSomething');

        setTimeout(() => {
          axios
            .put(`http://localhost:3000/api/animal/${this.form.id}`, this.form)
            .then(() => {
              this.isDone = true;
            })
            .catch(err => {
              this.errors = err.response.data.errors;
            })
            .finally(()=> {
              this.isSubmitting = false;
            })
        }, 1000)
      },
      getAnimal(id){
        axios
          .get(`http://localhost:3000/api/animal/${id}`)
          .then(response => {
            this.form = response.data
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
