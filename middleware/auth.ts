import { getAccessToken } from '~/composables/accessToken/getAccessToken'

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = getAccessToken()

  if (!accessToken.value) {
    return '/login'
  }
})
