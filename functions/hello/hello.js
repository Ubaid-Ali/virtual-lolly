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
    author(id: ID): Author
    authorByName(name: String!): Author
    authorArray: AllAuthors
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
    lollyPath: String
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
  type Author {
    id: ID
    name: String!
    married: Boolean
  }
  type AllAuthors {
    authors: [Author]
  }
`

const authors = [
  { id: 1, name: "Terry Pratchett", married: false },
  { id: 2, name: "Stephen King", married: true },
  { id: 3, name: "JK Rowling", married: false },
]

const AllAuthors = {
  authors: authors,
}

const dummylolly = {
  fillLollyTop: "#4B0082",
  fillLollyMiddle: "#8A2BE2",
  fillLollyBottom: "#FF00FF",
  recipientName: "recipient dummy",
  message: "dummy message",
  sender: "dummy Lolly",
  lollyPath: "HZEwe1eTSdummyPath",
}

const resolvers = {
  Query: {
    lollies: async () => {
      if (client) {
        console.log("===database connetion success===")
      }
      if (!client) {
        console.log("===cannot connect to database!===")
      }

      try {
        // get data from faunadb
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
      }
    },
    getLollyUsingPath: async (_, { lollyPath }) => {
      // P A T H
      console.log(`LollyPath is ==>`, lollyPath)
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_path_index"), lollyPath))
        )

        console.log(`getLollyUsingPath ====>`, result.data)
        return result.data
      } catch (error) {
        console.log("error while get Lolly by getLollyUsingPath", error.message)
      }

      return error.message
    },
    //
    authorArray: () => AllAuthors,
    hello: () => "Hello, world!",
    author: () => {
      return authors[0]
    },
    authorByName: (root, args) => {
      console.log("hihhihi", args.name)
      return authors.find(author => author.name === args.name) || "NOTFOUND"
    },
  },
  Mutation: {
    makeLolly: async (_, args) => {
      const id = shortId.generate()
      args.lollyPath = id
      // Upload lolly data to FaunaDB
      const result = await client.query(
        q.Create(q.Collection("lolly-collection"), { data: args })
      )
      // console.log(`result.ref.id =========>`, result.ref.id)
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
