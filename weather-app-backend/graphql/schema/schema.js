const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type City {
    _id: ID!
    state: String!
    city: String!
    coords: Coords!
    userId: String!
  }

  type Coords {
    lat: Float!
    lng: Float!
  }

  input CityInput {
    state: String!
    city: String! # Enforced as mandatory
    coords: CoordsInput!
    userId: String!
  }

  input CoordsInput {
    lat: Float!
    lng: Float!
  }

  type Query {
    cities(userId: ID!): [City]!
  }

  type Mutation {
    createCity(cityInput: CityInput!): City! # Non-null City object
  }
`);
