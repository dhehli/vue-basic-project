<template>
  <div>
    <h1><p>{{ $t('animals.title.main') }}</p></h1>
    <b-button class="my-4" to="/animal/add">{{ $t('animals.form.button-add') }}</b-button>
    <b-table striped hover :fields="fields" :items="animals">
      <template slot="show_details" slot-scope="row">        
        <b-button size="sm" class="mr-2" :to="{ path: `/animal/${row.item.id}/detail`  }">
          {{ $t('animals.form.button-add') }}
        </b-button>
        <b-button size="sm" variant="primary" class="mr-2" :to="{ path: `/animal/${row.item.id}/edit` }">
          {{ $t('animals.form.button-edit') }}
        </b-button>
        <b-button size="sm" variant="danger" @click="showModal(row.item.id)">
          {{ $t('animals.form.button-delete') }}
        </b-button>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal id="delete-modal" @ok="handleModalOk" @hide="handleModalCancel">
        {{ $t('animals.form.msg-delete') }}
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ANIMALS_FETCH,ANIMALS_FETCH_DEL } from '@/store/actions.type'


export default {
  name:"AnimalList",

  data() {
    return {
      fields: [
        { key: 'id', sortable: true },
        { key: 'name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'race', sortable: true },
        { key: 'show_details', label: ''},
      ],
      deleteAnimalId: 0
    }
  },
  computed: {
    ...mapGetters(['animals'])
  },
  methods: {
    animalsFetch(){
      this.$store.dispatch(ANIMALS_FETCH)
    },
    deleteAnimal(id){
      this.$store.dispatch(ANIMALS_FETCH_DEL, id)
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
   this.animalsFetch();
  }
}
</script>