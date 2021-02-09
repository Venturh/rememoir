import { onError } from '@apollo/client/link/error'
import { tryAccessToken } from '../utils/auth'

export default function () {
  const httpEndpoint = `http://${process.env.NUXT_ENV_API}/graphql`
  const httpLinkOptions = {
    credentials: 'include',
    httpLinkOptions: {
      credentials: 'include',
    },
  }

  const link = onError((error) => {
    error.graphQLErrors?.forEach((err) => {
      console.log('graphQLErrors.forEach ~ err', err)
    })
  })

  return {
    httpLinkOptions,
    link,
    httpEndpoint,
    getAuth: async () => {
      return `bearer ${await tryAccessToken(true)}`
    },
  }
}
