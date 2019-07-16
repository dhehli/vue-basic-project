<template>
  <div class="about">
    <h1>Animals</h1>
    <b-button class="my-4" to="/animal/add">Add Animal</b-button>

    <b-table striped hover :fields="fields" :items="animals">
      <template slot="show_details" slot-scope="row">        
        <b-button size="sm" class="mr-2" :to="{ path: '/animal/detail/' + row.item.id }">Details</b-button>
        <b-button size="sm" variant="danger" @click="showModal(row.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal id="delete-modal" @ok="handleModalOk" @hide="handleModalCancel">
      Do you really want to delete this entry?
    </b-modal>

    <AnimalForm @clickedSomething="createAnimal" />
    
  </div>
</template>



<script>
import axios from 'axios';
import AnimalForm from './AnimalForm.vue'

export default {
  name:"Animal",
  data() {
    return {
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'race', sortable: true },
        { key: 'color_id', sortable: true },
        { key: 'show_details', label: ''},
      ],
      selectedAnimal: {},
      animals: [],
      deleteAnimalId: 0
    }
  },
  methods: {
    getAnimals(){
      axios
      .get('http://localhost:3000/api/animal')
      .then(response => {
        this.animals = response.data
      })
      .catch((err) => {
        console.log("err",err)
      })
    },
    createAnimal(){
      console.log("create Animal");
    },
    updateAnimal(){
      console.log("update Animal");
    },
    deleteAnimal(id){
      axios
        .delete(`http://localhost:3000/api/animal/${id}`)
        .then(() => {
          const index = this.animals.map(item => item.id).indexOf(id) 
          this.animals.splice(index, 1);
        })
        .catch((err) => {
          console.log("err",err)
        })
    },
    showModal(id){
      this.$root.$emit('bv::show::modal', 'delete-modal')
      this.deleteAnimalId = id;
    },
    handleModalOk(){
      this.deleteAnimal(this.deleteAnimalId)
      this.deleteAnimalId = 0;
    },
    handleModalCancel(){
      this.deleteAnimalId = 0;
    },
  },
  mounted() {
   this.getAnimals();
  },
  components: {
    AnimalForm
  }
}
</script>
