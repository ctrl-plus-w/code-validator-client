import { ApolloClient, InMemoryCache } from '@apollo/client';

const { NEXT_PUBLIC_SERVER_URI } = process.env;

const client = new ApolloClient({
  uri: `${NEXT_PUBLIC_SERVER_URI}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
