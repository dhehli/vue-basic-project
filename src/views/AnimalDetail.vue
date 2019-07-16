<template>
  <div>
    <h1>Detail Animal</h1>
    <b-button class="my-4" to="/animal">Back</b-button>
    <b-card
      title="Lion"
    >
      <b-card-text>
        <b-list-group>
          <b-list-group-item>ID: 123</b-list-group-item>
          <b-list-group-item>Age: 2</b-list-group-item>
          <b-list-group-item>Race: </b-list-group-item>
          <b-list-group-item>Color:</b-list-group-item>
        </b-list-group>
      </b-card-text>
      
      <!--<b-button href="#" variant="primary">Go somewhere</b-button>-->
    </b-card>    
  </div>
</template>

<script>
  export default {
    name: "AnimalDetail"
  }
</script>
