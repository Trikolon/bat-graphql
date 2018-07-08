import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import queries from './queries';

export default db => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries(db),
  }),
});
