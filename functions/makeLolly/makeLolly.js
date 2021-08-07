const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    message: String
  }
`

const resolvers = {
  Query: {
    message: () => {
      return "This is Simple Message!"
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
})

const handler = server.createHandler()

module.exports = { handler }