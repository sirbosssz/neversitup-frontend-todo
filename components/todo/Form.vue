<template>
  <form @submit.prevent="createTodo">
    <div class="mt-2">
      <InputText
        label="Title"
        placeholder="Title"
        name="title"
        type="text"
        v-model="title"
        :attrs="titleAttrs"
      />
    </div>
    <div class="mt-2">
      <InputTextfield
        label="Description"
        placeholder="Description"
        name="description"
        v-model="description"
        :attrs="descAttrs"
      />
    </div>

    <InputError :message="formError.title" />

    <div v-if="!isSubmitting" class="mt-4 flex gap-3">
      <ButtonPrimary type="submit"> {{ submitButtonMessage }} </ButtonPrimary>
      <ButtonSecondary @click="$emit('closeModal')"> Close </ButtonSecondary>
    </div>
    <div v-else class="mt-4 block text-center">Submitting...</div>

    <pre>{{ formData }}</pre>
    <pre>{{ title }}</pre>
  </form>
</template>

<script setup lang="ts">
  import { object, string } from 'yup'
  import { useForm, type GenericObject } from 'vee-validate'
  import { TodoRepository, type Todo } from '~/repository/todo'
  import { useFormError } from '~/composables/form/useFormError'
  import { TodoFormMode } from '~/enums/TodoFormMode'

  const emit = defineEmits(['closeModal', 'created'])
  const props = defineProps({
    id: { type: String, default: '' },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    mode: {
      type: Number as PropType<TodoFormMode>,
      default: TodoFormMode.CREATE,
    },
  })

  const submitButtonMessage = computed(() => {
    switch (props.mode) {
      case TodoFormMode.CREATE:
        return 'Create'

      case TodoFormMode.EDIT:
        return 'Save'
    }
  })

  // form validate
  const { defineField, handleSubmit, isSubmitting, setFieldValue } = useForm({
    validationSchema: object({
      title: string().required('Create todo required Titile'),
      description: string().optional(),
    }),
    initialValues: {
      title: props.title,
      description: props.description,
    },
  })
  const [title, titleAttrs] = defineField('title')
  const [description, descAttrs] = defineField('description')

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
      switch (props.mode) {
        case TodoFormMode.CREATE:
          await todoRepo.create(formData)
          emit('created')
          emit('closeModal')
          break

        case TodoFormMode.EDIT:
          await todoRepo.edit(props.id, formData)
          break
      }
    },
    ({ errors }) => setFormError(errors)
  )
</script>
