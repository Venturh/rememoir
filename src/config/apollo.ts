import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  Observable,
} from '@apollo/client/core'

import { onError } from '@apollo/client/link/error'

import { getAccessToken, tryAccessToken } from '../utils/auth'

//https://stackoverflow.com/questions/50965347/how-to-execute-an-async-fetch-request-and-then-retry-last-failed-request/51321068#51321068
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors && graphQLErrors[0].message === 'ERROR_NO_AUTH') {
      return new Observable((observer) => {
        tryAccessToken()
          .then((refreshResponse) => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${refreshResponse}` || null,
              },
            }))
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }

            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch((error) => {
            observer.error(error)
          })
      })
    }
  }
)

const httpLink = createHttpLink({
  uri: 'http://api.projectm.localhost/graphql',
  headers: `bearer ${getAccessToken}`,
  credentials: 'include',
})
const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  connectToDevTools: true,
})
