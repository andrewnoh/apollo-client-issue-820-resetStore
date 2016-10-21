import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';

import express from 'express';
import { Schema, Resolvers } from './data/schema';

const GRAPHQL_PORT = 1337;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,
});

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress((req) => {
  // req.query.query || req.body.query
  // req.user
  return {
    schema: executableSchema,
    context: {},
  };
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
