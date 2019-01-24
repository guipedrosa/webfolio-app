<template>
  <div>
    <b-card :title="$t('welcome_short_message')"
          img-src="./src/assets/img/open-image.png"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 card-title">
      <p class="card-text">
        {{ $t('welcome_long_message') }}
      </p>
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

