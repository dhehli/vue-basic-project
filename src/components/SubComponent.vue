<template>
  <div>
    Das ist die Childklasse {{hupsText}}
    <button @click="customEvent">Call parent</button>
  </div>
</template>

<script>
  export default {
    name: 'SubComponent',
    props: {
      hupsText: {
        type: String,
        required: true
      }
    },
    methods: {
      customEvent() {
        console.log("child")
        this.$emit('clickedSomething');
      }
    }
  }
  
</script>
