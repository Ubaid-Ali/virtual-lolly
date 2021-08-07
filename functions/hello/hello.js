const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const message = "Welcome to this Posiion"
const resolvers = {
  Query: {
    hello: () => {
      return message
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
