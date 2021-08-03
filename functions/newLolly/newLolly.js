const { ApolloServer, gql } = require('apollo-server-lambda')


// This function/file is Not Ready yet!
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Lolly {
    recipientName: String!
    message: String!
    sender: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    allAuthors: () => authors,
    author: () => {},
    authorByName: (root, args) => {
      console.log('hihhihi', args.name)
      return authors.find((author) => author.name === args.name) || 'NOTFOUND'
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
