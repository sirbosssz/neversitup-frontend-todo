<template>
  <form @submit.prevent="onSubmit">
    <InputText
      label="Username"
      placeholder="Username"
      name="username"
      type="text"
      v-model="username"
      :error="formError.username"
    />

    <InputText
      label="Password"
      placeholder="Password"
      name="password"
      type="password"
      v-model="password"
      :error="formError.password"
    />

    <InputError :message="formError.login" />

    <ButtonPrimary type="submit" :disabled="isSubmitting">
      Login
    </ButtonPrimary>
  </form>
</template>

<script setup lang="ts">
  import { object, string } from 'yup'
  import { useForm, type GenericObject } from 'vee-validate'
  import { AuthRepository } from '~/repository/auth'
  import { useFormError } from '~/composables/form/useFormError'

  // form validate
  const { defineField, handleSubmit, isSubmitting } = useForm({
    validationSchema: object({
      username: string().required('Required Username'),
      password: string()
        .min(4, 'Password must be in range of 4 to 20 characters')
        .max(20, 'Password must be in range of 4 to 20 characters')
        .required('Required Password'),
    }),
  })
  const [username] = defineField('username')
  const [password] = defineField('password')

  // form error
  const { formError, setFormError, resetFormError } = useFormError()

  // login
  const authRepo = new AuthRepository()
  const onSubmit = handleSubmit(
    (values: GenericObject) => {
      resetFormError()
      const body = {
        username: values.username,
        password: values.password,
      }
      const errorCallback = (message: string) =>
        setFormError({ login: message })
      authRepo.login(body, errorCallback)
    },
    ({ errors }) => setFormError(errors)
  )
</script>

<style lang="scss" scoped>
  .form-base {
    max-width: 500px;
    width: 100%;
  }
</style>
