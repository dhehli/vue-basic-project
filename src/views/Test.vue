<template>
  <div class="about">
    <h1>This is a Test page</h1>
    <span v-bind:title="message">
      Hover your mouse over me for a few seconds
      to see my dynamically bound title!
    </span>
    <hr>
    <span v-if="state">
      Der status ist true
    </span>
    <hr>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo.text">
        {{ todo.text }}
      </li>
    </ol>
    <button v-on:click="handleCreate">Fire event</button>
    <hr>
    <input v-model="form.name">
    <hr>
    <SubComponent hups-text="hups das ist ein Text" @clickedSomething="handleClickInParent" />
   
  </div>
</template>


<script>
import SubComponent from '@/components/SubComponent.vue'

export default {
  data() {
    return {
      message: 'You loaded this page on ' + new Date().toLocaleString(),
      state: true,
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ],
      form: {
        name: "a"
      }      
    }
  },
  methods: {
    handleCreate() {
      console.log("handle create")
      this.state = false;
    },
    handleClickInParent(){
      console.log("doSomething")
    }
  },
  components: {
    SubComponent
  }
}
</script>


