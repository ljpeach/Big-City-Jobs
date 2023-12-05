const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    savedJobs: [JobPosting]
  }

  type JobPosting {
    _id: ID
    name: String
    location: Location
    employer: Employer
    details: String
    available: Boolean
    applyLink: String
    pay: String
    postedDate: String
  }

  type Location {
    _id: ID
    name: String
    jobPostings: [JobPosting]
  }

  type Employer {
    _id: ID
    name: String
    website: String
    description: String
    jobPostings: [JobPosting]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    location(locationId: ID!): Location
    locations: [Location]
    job(jobId: ID!): JobPosting
    jobs: [JobPosting]
    employer(employerId: ID!): Employer
    employers: [Employer]
    employerJobs(employerId: ID!): [JobPosting]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    favoriteJob(jobId: ID!): JobPosting
  }
`;

module.exports = typeDefs;
