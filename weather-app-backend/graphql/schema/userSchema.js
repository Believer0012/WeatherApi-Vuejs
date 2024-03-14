const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    fullname: String!
    email: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    fullname: String!
    email: String!
    password: String!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): AuthData!
  }
  

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
