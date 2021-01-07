import { onError } from '@apollo/client/link/error'
import { getAccessToken } from '../utils/auth'

export default function () {
  const httpEndpoint = 'http://localhost:4000/graphql'
  const httpLinkOptions = {
    credentials: 'include',
    httpLinkOptions: {
      credentials: 'include',
    },
  }

  // TODO: Acces Token refresh
  // https://github.com/nuxt-community/apollo-module/issues/315
  // https://github.com/newsiberian/apollo-link-token-refresh

  const link = onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
      console.log('graphQLErrors', err)
    })
  })

  return {
    httpLinkOptions,
    link,
    httpEndpoint,
    getAuth: () => {
      return `bearer ${getAccessToken()}`
    },
  }
}
