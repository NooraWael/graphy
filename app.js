const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    id: ID
    login: String
    xp: Int
    grade: Float
    audits: Int
    skills: [String]
  }
`;

const resolvers = {
  Query: {
    user: (parent, args, context) => {
      // Fetch user data based on JWT
      const user = context.user;
      return {
        id: user.id,
        login: user.login,
        xp: 2000, // Replace with actual data fetching logic
        grade: 4.0,
        audits: 5,
        skills: ['JavaScript', 'GraphQL']
      };
    }
  }
};

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token.split(' ')[1]);
    return { user };
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
