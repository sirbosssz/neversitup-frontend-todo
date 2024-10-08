import { getAccessToken } from '~/composables/accessToken/getAccessToken'

type AuthUser = {
  username: string
  access_token: string
}

type LoginBody = {
  username: string
  password: string
}

export class AuthRepository {
  private API_ENDPOINT = '/api/auth/login'

  public async login(
    body: LoginBody,
    errorCallback: (message: string) => void
  ): Promise<void> {
    const loginResponse = await $fetch<AuthUser>(this.API_ENDPOINT, {
      method: 'POST',
      body,
      async onResponseError({ response }) {
        errorCallback(response._data.message)
      },
    })

    await this.saveToken(loginResponse.access_token)
  }

  private async saveToken(token: string): Promise<void> {
    // set token
    const accessTokenCookie = getAccessToken()
    accessTokenCookie.value = token

    // redirect to index
    await navigateTo('/')
  }
}
