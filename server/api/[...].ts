import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().apiUrl
  const path = event.path.replace(/^\/api\//, '')

  const target = joinURL(proxyUrl, path)

  return proxyRequest(event, target)
})
