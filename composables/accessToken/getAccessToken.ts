import type { CookieRef } from '#app'

export function getAccessToken(): CookieRef<string | null | undefined> {
  return useCookie('access_token', {
    secure: true,
  })
}
