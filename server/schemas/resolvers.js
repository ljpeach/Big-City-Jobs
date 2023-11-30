const { User, } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    
  },
  Mutation: {
    
  }
};

module.exports = resolvers;
