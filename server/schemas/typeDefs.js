const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type JobPosting {
    _id: ID
    name: String
    location: Location
  }

  type Location {
    _id: ID
    name: String
    jobPostings: [JobPosting]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
