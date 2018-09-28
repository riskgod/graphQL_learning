const {
    ApolloServer,
    gql
} = require('apollo-server')


const books = [{
        title: "hello",
        author: "bruce"
    },
    {
        title: "googd",
        author: "riskgod"
    }
]

const typeDefs = gql `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
        books: () => books,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`)
})