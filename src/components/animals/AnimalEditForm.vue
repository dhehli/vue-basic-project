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
          v-model="animal.name"
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Age" label-for="age">
        <b-form-input
          id="age"
          v-model="animal.age"
          type="number"
          placeholder="Enter age"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Race" label-for="race">
        <b-form-input
          id="race"
          v-model="animal.race"
          placeholder="Enter race"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" v-if="!isSubmitting">Submit</b-button>
      <b-button type="submit" disabled variant="primary" v-if="isSubmitting">
        <b-spinner small label="Loading..."></b-spinner>
      </b-button>
      
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ animal }}</pre>
    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { ANIMAL_FETCH, ANIMALS_FETCH_UPDATE } from '@/store/actions.type'

  export default {
    name: "AnimalEditForm",
    data() {
      return {
        showForm: true,
        isSubmitting: false,
        isDone: false,
        errors: []
      }
    },
    computed: {
      ...mapGetters(['animal'])
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.isSubmitting = true;
        this.errors = [];

        this.$store.dispatch(ANIMALS_FETCH_UPDATE, {...this.animal}) // TODO: why is this necessary
        .then(() => {
          this.isDone = true;
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        })
        .finally(() => {
          this.isSubmitting = false;
        })
      },
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
