<template>
  <div>
    <hr>
    <h3>{{ $t('register.title.change') }}</h3>

    <b-alert variant="success" v-if="isDone" show>
     password changed
    </b-alert>

    <div v-for="error in errors" v-bind:key="error.msg">
      <b-alert variant="danger" show>
        {{error.msg}}
      </b-alert>
    </div>

    <b-form @submit="onSubmit" v-if="showForm">
      <b-form-group id="password" label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"          
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="matchpassword" label="Password confirm" label-for="matchpassword">
        <b-form-input
          id="matchpassword"
          v-model="user.matchpassword"
          type="password"          
          placeholder="Confirm password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" v-if="!isSubmitting">Senden</b-button>
      <b-button type="submit" disabled variant="primary" v-if="isSubmitting">
        <b-spinner small label="Loading..."></b-spinner>
      </b-button>
      
    </b-form>
  </div>
</template>

<script>
  import { USER_FETCH_CHANGE_PW } from '@/store/user/actions.type'

  export default {
    name: "ProfilePassword",
    data() {
      return {
        showForm: true,
        isSubmitting: false,
        isDone: false,
        errors: [],
        user: {
          password: '',
          matchpassword: ''
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.isSubmitting = true;
        this.errors = [];

        this.$store.dispatch(USER_FETCH_CHANGE_PW, this.user)
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
