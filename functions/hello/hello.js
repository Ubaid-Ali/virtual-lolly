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

const resolvers = {
  Query: {
    lollies: async () => {
      if (!client) {
        return console.log("DATABASE NOT CONNECTED")
      } else {
        console.log("DATABASE CONNECTED SUCCESSFULLY!")
      }
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("lolly-collection"))),
            q.Lambda(x => q.Get(x))
          )
        )

        const lollies = result.data.map(lolly => lolly.data)
        console.log("lollies", lollies)
        return lollies
      } catch (error) {
        console.log("Error: [%s] %s: %s, error while get all lollies ", error)
      }
    },
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
      // console.log(`result==============>`, result)
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
