<template>
  <Container>
    {{ $route.params.id }}
    <TodoForm
      :id="data?.id"
      :title="data?.title"
      :description="data?.description"
      @created="refresh()"
      :mode="TodoFormMode.EDIT"
    />
  </Container>
</template>

<script setup lang="ts">
  import { TodoFormMode } from '~/enums/TodoFormMode'
  import { TodoRepository } from '~/repository/todo'
  definePageMeta({
    middleware: ['auth'],
  })

  const route = useRoute()
  const id = computed(() => {
    const id = route.params.id
    if (typeof id == 'string') {
      return id
    } else {
      return id[0]
    }
  })

  const todoRepo = new TodoRepository()
  const { data, refresh, error } = await useAsyncData(() =>
    todoRepo.getById(id.value)
  )
  if (error.value) {
    console.error(error.value)
    navigateTo('/')
  }
  const pageMeta = computed(() => ({
    title: 'Todo: ' + data.value?.title,
    desctiption: data.value?.description,
  }))

  useHead({
    title: pageMeta.value.title,
    meta: [{ name: 'description', content: pageMeta.value.desctiption }],
  })
  useSeoMeta({
    title: pageMeta.value.title,
    ogTitle: pageMeta.value.title,
    description: pageMeta.value.desctiption,
    ogDescription: pageMeta.value.desctiption,
  })
</script>
