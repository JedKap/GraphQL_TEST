import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GetAllGames, AddGame } from './components'
import './App.css'


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
} )


const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000' })
])

const client = new ApolloClient({ cache: new InMemoryCache(), link })


function App() {
 
  return <ApolloProvider client={client}  ><GetAllGames  /><AddGame /></ApolloProvider>
  
}

export default App
