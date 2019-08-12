<template>
  <div>
    <h1>{{ $t('register.title.main') }}</h1>

    <b-alert variant="success" v-if="isDone" show>
     user created
    </b-alert>

    <div v-for="error in errors" v-bind:key="error.msg">
      <b-alert variant="danger" show>
        {{error.msg}} for field {{error.param}}
      </b-alert>
    </div>

    <b-form @submit="onSubmit" v-if="showForm">
      <b-form-group id="salutation" label="Anrede" label-for="salutation">
        <b-form-select v-model="user.salutation" :options="salutations"></b-form-select>
      </b-form-group>

      <b-form-group id="firstname" label="Vorname" label-for="firstname">
        <b-form-input
          id="firstname"
          v-model="user.firstname"
          placeholder="Enter firstname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="lastname" label="Name" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="user.lastname"
          placeholder="Enter lastname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="email" label="E-mail" label-for="email">
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Enter e-mail"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"          
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" v-if="!isSubmitting">Senden</b-button>
      <b-button type="submit" disabled variant="primary" v-if="isSubmitting">
        <b-spinner small label="Loading..."></b-spinner>
      </b-button>
      
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ user }}</pre>
    </b-card>
  </div>
</template>

<script>
  import { REGISTER_FETCH_ADD } from '@/store/user/actions.type'

  export default {
    name: "RegisterForm",
    data() {
      return {
        showForm: true,
        isSubmitting: false,
        isDone: false,
        errors: [],
        salutations: [
          { value: 1, text: 'Herr' },
          { value: 2, text: 'Frau' }
        ],
        user: {
          salutation: 1,
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.isSubmitting = true;
        this.errors = [];

        this.$store.dispatch(REGISTER_FETCH_ADD, this.user)
        .then(() => {
          this.isDone = true;
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        })
        .finally(()=> {
          this.isSubmitting = false;
        })
      }
    }
  }
</script>
