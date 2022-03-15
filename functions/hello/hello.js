const { ApolloServer, gql } = require("apollo-server-lambda")
const shortId = require("shortid")
const faunadb = require("faunadb")
const q = faunadb.query
require("dotenv").config()

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

const typeDefs = gql`
  type Query {
    hello: String
    lollies: [Lolly]
    getLollyUsingPath(lollyPath: String!): Lolly
  }
  type Lolly {
    fillLollyTop: String
    fillLollyMiddle: String
    fillLollyBottom: String
    recipientName: String
    message: String
    sender: String
    lollyPath: String!
  }
  type Mutation {
    makeLolly(
      fillLollyTop: String!
      fillLollyMiddle: String!
      fillLollyBottom: String!
      recipientName: String!
      message: String!
      sender: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    // GET ALL LOLLIES
    lollies: async () => {
      if (client) {
        console.log("===database connetion success===")
      }
      if (!client) {
        console.log("===cannot connect to database!===")
      }
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("lolly-collection"))),
            q.Lambda(x => q.Get(x))
          )
        )
        const lollies = result.data.map(lolly => lolly.data)
        // console.log("lollies", lollies)
        return lollies
      } catch (error) {
        console.log("Error: [%s] %s: %s, error while get all lollies ", error)
        return error.message
      }
    },
    // GET LOLLY BY PATH
    getLollyUsingPath: async (_, { lollyPath }) => {
      console.log("lollyPath ===> ", lollyPath)
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_path_index"), lollyPath))
        )
        return result.data
      } catch (error) {
        console.log("error==>", error)
        console.log(
          "error while get Lolly by getLollyUsingPath error.message==>",
          error.message
        )
        return error
      }
    },
    hello: () => "Hello, world!",
  },
  Mutation: {
    makeLolly: async (_, args) => {
      try {
        const id = shortId.generate()
        args.lollyPath = id
        // Upload lolly data to FaunaDB
        const result = await client.query(
          q.Create(q.Collection("lolly-collection"), { data: args })
        )
        return result.data
      } catch (error) {
        console.log("===> error when creating new lolly <===", error)
        return error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
