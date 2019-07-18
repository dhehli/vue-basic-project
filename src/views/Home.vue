<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{ $t('message') }}</p>
    <LocaleChanger />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LocaleChanger from '@/components/LocaleChanger.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    LocaleChanger
  }
}
</script>
