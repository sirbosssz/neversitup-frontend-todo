<template>
  <div class="form-base bg-slate-300 dark:bg-slate-700 p-3 rounded-md">
    <form @submit.prevent="onSubmit">
      <LoginInput
        label="Username"
        placeholder="Username"
        name="username"
        type="text"
        v-model="username"
        :error="formError.username"
      />

      <LoginInput
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        v-model="password"
        :error="formError.password"
      />

      <LoginError :message="formError.login" />

      <button
        class="block w-full bg-lime-300 text-black p-2 my-4 rounded-md"
        type="submit"
        :disabled="isSubmitting"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { object, string } from 'yup'
  import { useForm, type GenericObject } from 'vee-validate'
  import { AuthRepository } from '~/repository/auth'

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
  function useFormError() {
    type FormErrorKeys = 'username' | 'password' | 'login'
    type FormError = Record<FormErrorKeys, string>

    const initError: FormError = {
      username: '',
      password: '',
      login: '',
    }
    const formError = reactive<FormError>({ ...initError })
    const setFormError = (errors: Partial<FormError>) => {
      Object.keys(formError).forEach((key: string) => {
        const errorKey = key as FormErrorKeys
        formError[errorKey] = errors[errorKey] ?? ''
      })
    }
    const resetFormError = () => {
      Object.assign(formError, initError)
    }
    return { formError, setFormError, resetFormError }
  }
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
