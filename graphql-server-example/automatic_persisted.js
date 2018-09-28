const {
    ApolloServer,
    gql
} = require('apollo-server')

const {
    MemcachedCache
} = require('apollo-server-cache-memcached')

const books = [{
        title: "hello",
        author: "bruce"
    },
    {
        title: "googd",
        author: "riskgod"
    }
]

typeDefs = gql `
type Book {
    title: String
    auther: String
}
type Query {
    books: [Book]
}
`
resolvers = {
    Query: {
        books: () => books
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: {
        cache: new MemcachedCache(
            ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'], {
                retries: 10,
                retry: 10000
            }
        ),
    }
})


server.listen().then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`);
})