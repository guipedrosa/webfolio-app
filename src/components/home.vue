<template>
  <div>
    
    <b-card :title="$t('welcome_short_message')"
          img-src="./src/assets/img/bg2-new.jpg"
          img-alt="Medicine"
          overlay
          tag="article"
          text-variant="white"
          :sub-title="$t('welcome_long_message')"
    >
    </b-card>
    
    <Login v-if="!$parent.logged()"></Login>
  
  </div>
</template>

<script>

import Login from './login.vue'

export default {
  components: {
    Login
  }
}

</script>

<style>

</style>

