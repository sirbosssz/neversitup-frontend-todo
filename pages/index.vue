<template>
  <Container>
    <div class="row flex justify-between sticky">
      <h1 class="font-black text-xl">Todo List</h1>
      <div class="inset-0 flex items-center justify-center">
        <ButtonPrimary @click="setCreateModalStatus(true)">
          Create Todo
        </ButtonPrimary>
      </div>
      <TodoModal
        :is-open="isOpenCreateModal"
        title="Create Todo Item"
        @set-is-open="setCreateModalStatus"
      >
        <TodoForm
          @close-modal="setCreateModalStatus(false)"
          @created="refresh()"
        />
      </TodoModal>
    </div>

    <div class="content pt-2 pb-2 gap-2 flex flex-col">
      <div v-if="status == 'success' && todoList?.length == 0">empty</div>
      <div v-for="todoItem in todoList" :key="todoItem.id">
        <TodoCard
          v-if="todoItem.id"
          :data="todoItem"
          @delete="deleteTodo(todoItem.id)"
        />
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
  import { TodoRepository } from '~/repository/todo'
  definePageMeta({
    middleware: ['auth'],
  })

  // seo
  const pageData = reactive({
    title: 'Todo List: Home',
    desctiption: 'Homepage of Todo List',
  })
  useHead({
    title: pageData.title,
    meta: [{ name: 'description', content: pageData.desctiption }],
  })
  useSeoMeta({
    title: pageData.title,
    ogTitle: pageData.title,
    description: pageData.desctiption,
    ogDescription: pageData.desctiption,
  })

  // modal
  const isOpenCreateModal = ref(false)
  const setCreateModalStatus = (status: boolean) => {
    isOpenCreateModal.value = status
  }

  // data
  const todoRepo = new TodoRepository()
  const {
    data: todoList,
    status,
    refresh,
  } = await useAsyncData(() => todoRepo.getAll())

  const deleteTodo = async (id: string) => {
    await todoRepo.delete(id)
    await refresh()
  }
</script>
