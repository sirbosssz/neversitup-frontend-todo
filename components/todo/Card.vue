<template>
  <section class="bg-slate-200 dark:bg-slate-600 p-4 rounded-2xl">
    <div class="flex justify-between align-baseline border-b">
      <span class="text-xl">{{ data.title }}</span>
      <span>{{ createdDate }}</span>
    </div>
    <div class="pt-2 pb-2 border-b" v-if="data.description">
      <p class="break-words">
        {{ data.description }}
      </p>
    </div>
    <div class="mt-4 flex gap-3">
      <NuxtLink :to="`/todo/${data.id}`">
        <ButtonPrimary>Edit</ButtonPrimary>
      </NuxtLink>
      <ButtonSecondary @click="setOpenModalStatus(true)">
        Delete
      </ButtonSecondary>
    </div>
    <TodoModal
      :is-open="isOpenModal"
      title="Confirm Delete?"
      @set-is-open="setOpenModalStatus"
    >
      <div class="flex gap-3">
        <ButtonPrimary @click="setOpenModalStatus(false)">Cancel</ButtonPrimary>
        <ButtonSecondary @click="deleteCard"> Confirm </ButtonSecondary>
      </div>
    </TodoModal>
  </section>
</template>

<script setup lang="ts">
  import * as dayjs from 'dayjs'
  import { type Todo } from '~/repository/todo'

  const props = defineProps({
    data: {
      type: Object as PropType<Todo>,
      required: true,
    },
  })

  // modal
  const isOpenModal = ref(false)
  const setOpenModalStatus = (status: boolean) => {
    isOpenModal.value = status
  }

  // delete
  const emit = defineEmits(['delete'])
  const deleteCard = () => {
    emit('delete', props.data.id)
  }

  // created date
  const createdDate = computed(() => {
    return dayjs.default(props.data.createdAt).format('YYYY-MM-DD HH:mm')
  })
</script>
