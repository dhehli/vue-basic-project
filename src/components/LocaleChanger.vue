<template>
  <b-nav-item-dropdown text="Lang" right>
    <b-dropdown-item 
      v-for="(lang, i) in langs" 
      :key="`Lang${i}`" 
      :value="lang" 
      @click="changeLanguage(lang)"
    >
      {{ lang }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: "Test",
  data () {
    return { langs: ['en', 'de'] }
  },
  methods: {
    changeLanguage(lang){
      this.$i18n.locale = lang
    }
  }
}
</script>