<template>
  <div>
    <h1 class="font-black">Index Page</h1>
  </div>
</template>

<script setup lang="ts">
  import { TodoRepository } from '~/repository/todo'
  definePageMeta({
    middleware: ['auth'],
  })

  const todoRepo = new TodoRepository()
  const { data, error, status, refresh } = await useAsyncData(() =>
    todoRepo.getAll()
  )
  console.log(data.value)
</script>
