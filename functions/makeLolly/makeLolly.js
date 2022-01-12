const { ApolloServer, gql } = require("apollo-server-lambda");
const shortId = require("shortid");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const typeDefs = gql`
  type Query {
    hello: String
    allAuthors: [author!]
    author(id: Int): author
    authorByName(name: String!): author
  }
  type author {
    id: ID
    name: String
    married: Boolean
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
`;

const authors = [
  { id: 001, name: "John Cena", married: true },
  { id: 002, name: "Roman Reign", married: true },
  { id: 003, name: "Brock Lesnar", married: true },
];

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    allAuthors: () => authors,
    author: () => authors[2],
    authorByName: (root, args) => {
      console.log("hihhihi", args.name);
      return authors.find((author) => author.name === args.name) || "NOTFOUND";
    },
  },
  Mutation: {
    makeLolly: async (_, args) => {
      const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
      const id = shortId.generate();
      args.lollyPath = id;
      // Upload Data to FaunaDB
      const result = await client.query(
        q.Create(q.Collection("lolly-collection"), { data: args })
      );

      // console.log(`result==============>`, result)
      // console.log(`result.ref.id =========>`, result.ref.id)
      return result.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
