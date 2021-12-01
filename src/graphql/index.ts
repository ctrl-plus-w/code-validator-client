import { ApolloClient, InMemoryCache } from '@apollo/client';

const { NEXT_PUBLIC_SERVER_URI } = process.env;

if (!NEXT_PUBLIC_SERVER_URI) throw new Error('Server uri not defined');

const client = new ApolloClient({
  uri: `${NEXT_PUBLIC_SERVER_URI}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
