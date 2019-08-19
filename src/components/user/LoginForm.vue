<template>
  <div>
    <h1>{{ $t('register.title.login') }}</h1>


    <div v-for="error in errors" v-bind:key="error.msg">
      <b-alert variant="danger" show>
        {{error.msg.message}} 
      </b-alert>
    </div>

    <b-form @submit="onSubmit" v-if="showForm">
      <b-form-group id="email" label="E-mail" label-for="email">
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Enter e-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"          
          placeholder="Enter password"
          required
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
  import { LOGIN_FETCH_ADD } from '@/store/user/actions.type'

  export default {
    name: "RegisterForm",
    data() {
      return {
        showForm: true,
        isSubmitting: false,
        isDone: false,
        errors: [],
        user: {
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

        this.$store.dispatch(LOGIN_FETCH_ADD, this.user)
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
