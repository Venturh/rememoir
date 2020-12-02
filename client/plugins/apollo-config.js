import { onError } from '@apollo/client/link/error'

export default function (context) {
  const httpEndpoint = 'http://localhost:4000/graphql'

  const httpLinkOptions = {
    credentials: 'include',
  }

  // ToDO: Acces Token refresh
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
  }
}
