export default defineNuxtPlugin({
  setup() {
    const accessToken = useCookie<string>('access_token')
    const todoFetch = $fetch.create({
      async onRequest() {
        if (!accessToken.value) {
          await navigateTo('/login')
        }
      },
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    return {
      provide: {
        todoFetch,
      },
    }
  },
})
