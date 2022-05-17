import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const link = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_API,
  // headers: {
  //   "Access-Control-Allow-Origin": "http://127.0.0.1:3000/"
  // },
  // fetchOptions: {
  //   mode: "no-cors"
  // }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const client = new ApolloClient({
  link: link,
  cache,
});

export default {};
