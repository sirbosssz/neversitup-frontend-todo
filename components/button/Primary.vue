<template>
  <button
    type="button"
    @click="$emit('click')"
    class="rounded-md bg-lime-300 text-black px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineEmits(['click'])
</script>
