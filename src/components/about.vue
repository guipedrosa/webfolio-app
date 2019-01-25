<template>

<div>

    <b-card :title="$t('about_short_message')"
          img-src="./src/assets/img/open-image.png"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 card-title">
      <p class="card-text">
        {{ $t('about_long_message') }}        
      </p>     
    </b-card>

</div>

</template>

<script>
export default {
    
}
</script>


<style>

</style>
