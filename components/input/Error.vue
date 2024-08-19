<template>
  <span v-if="message" class="text-red-600">{{ message }}</span>
</template>

<script setup lang="ts">
  defineProps({
    message: {
      type: String,
      default: '',
    },
  })
</script>
