<template>
  <div class="form-base bg-slate-300 dark:bg-slate-700 p-3 rounded-md">
    <form @submit.prevent="onSubmit">
      <LoginInputGroup
        label="Username"
        placeholder="Username"
        name="username"
        type="text"
        :error="formError.username"
        v-model="username"
      />

      <LoginInputGroup
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        :error="formError.password"
        v-model="password"
      />

      <span v-if="formError.loginError" class="text-red-600">{{
        formError.loginError
      }}</span>

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
  import { useForm } from 'vee-validate'

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

  let formError = reactive({
    username: '',
    password: '',
    loginError: '',
  })
  const setError = (errors: Partial<Record<string, string>>) => {
    formError.username = errors.username ?? ''
    formError.password = errors.password ?? ''
  }
  const resetError = () => {
    formError.username = ''
    formError.password = ''
    formError.loginError = ''
  }

  const onSubmit = handleSubmit(
    async (values) => {
      resetError()
      const result = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          username: values.username,
          password: values.password,
        },
      }).catch((error) => {
        formError.loginError = error.data.message ?? ''
      })

      if (result) {
        // set token
        const token = result.access_token
        const accessTokenCookie = useCookie('access_token')
        accessTokenCookie.value = token

        // redirect to index
        const router = useRouter()
        router.push('/')
      }
    },
    ({ errors }) => {
      setError(errors)
    }
  )
</script>

<style lang="scss" scoped>
  .form-base {
    max-width: 500px;
    width: 100%;
  }
</style>
