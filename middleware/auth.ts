export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('access_token')

  if (!accessToken.value) {
    return '/login'
  }
})
