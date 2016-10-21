import { FortuneCookie } from './connectors';

const typeDefinitions = `
schema {
  query: Query
}

type Query {
  getFortuneCookie: String
}
`;
const Schema = [typeDefinitions];

const Resolvers = {

  Query: {
    getFortuneCookie(_, args) {
      return FortuneCookie.getOne();
    },
  },

};

export { Schema, Resolvers };
