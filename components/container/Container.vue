<template>
  <main class="flex justify-center items-center p-2">
    <div class="base container bg-slate-300 dark:bg-slate-700 p-4 rounded-2xl">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped lang="scss">
  .base {
    max-width: 500px;
    width: 100%;
  }
</style>
