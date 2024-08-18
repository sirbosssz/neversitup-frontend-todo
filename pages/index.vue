<template>
  <div>
    <h1 class="font-black">Index Page</h1>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
  })
</script>
