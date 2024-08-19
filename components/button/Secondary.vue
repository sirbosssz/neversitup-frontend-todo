<template>
  <button
    type="button"
    @click="$emit('click')"
    class="rounded-md border border-lime-300 bg-white text-lime-600 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineEmits(['click'])
</script>
