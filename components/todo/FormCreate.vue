<template>
  <form @submit.prevent="createTodo">
    <div class="mt-2">
      <InputText
        label="Title"
        placeholder="Title"
        name="title"
        type="text"
        v-model="title"
      />
    </div>
    <div class="mt-2">
      <InputTextfield
        label="Description"
        placeholder="Description"
        name="description"
        v-model="description"
      />
    </div>

    <InputError :message="formError.title" />

    <div class="mt-4 flex gap-3">
      <ButtonPrimary type="submit"> Create </ButtonPrimary>
      <ButtonSecondary @click="$emit('closeModal')"> Close </ButtonSecondary>
    </div>

    <pre>{{ formData }}</pre>
  </form>
</template>

<script setup lang="ts">
  import { object, string } from 'yup'
  import { useForm, type GenericObject } from 'vee-validate'
  import { TodoRepository, type Todo } from '~/repository/todo'
  import { useFormError } from '~/composables/form/useFormError'

  const emit = defineEmits(['closeModal', 'created'])

  // form validate
  const { defineField, handleSubmit, handleReset } = useForm({
    validationSchema: object({
      title: string().required('Create todo required Titile'),
      description: string().optional(),
    }),
  })
  const [title] = defineField('title')
  const [description] = defineField('description')

  // form error
  const { formError, setFormError, resetFormError } = useFormError()

  const formData = reactive<Todo>({
    title: '',
    description: '',
  })
  // submit
  const todoRepo = new TodoRepository()
  const createTodo = handleSubmit(
    async (values: GenericObject) => {
      resetFormError()
      formData.title = values.title
      formData.description = values.description ?? ''
      await todoRepo.create(formData)
      emit('created')
    },
    ({ errors }) => setFormError(errors)
  )
</script>
