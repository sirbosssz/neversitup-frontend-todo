<template>
  <Container>
    <div class="row flex justify-between sticky">
      <h1 class="font-black text-xl">Todo List</h1>
      <TodoModal
        :is-open="isOpenCreateModal"
        @set-is-open="setCreateModalStatus"
      >
        <TodoFormCreate
          @close-modal="setCreateModalStatus(false)"
          @created="refresh()"
        />
      </TodoModal>
    </div>

    <div class="content">
      <div v-if="status == 'success' && todoList?.length == 0">empty</div>
      <div v-for="todoItem in todoList" :key="todoItem.id">
        <pre>{{ todoItem }}</pre>
        <!-- todocomponent -->
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
  import { TodoRepository } from '~/repository/todo'
  definePageMeta({
    middleware: ['auth'],
  })

  const isOpenCreateModal = ref(false)
  const setCreateModalStatus = (status: boolean) => {
    isOpenCreateModal.value = status
  }

  const todoRepo = new TodoRepository()
  const {
    data: todoList,
    status,
    refresh,
  } = await useAsyncData(() => todoRepo.getAll())
</script>
