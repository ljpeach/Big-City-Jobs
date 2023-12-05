const { User, Employer, JobPosting, Location } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user);
        // const user = await User.findById(context.user._id); // keep just in case
        return await User.findById(context.user._id);
      }

      throw AuthenticationError;
    },
    location: async (parent, args) => {
      return await Location.findById(args.locationId).populate('jobPostings');
    },
    locations: async () => {
      return await Location.find({}).populate('jobPostings');
    },
    job: async (parent, args) => {
      return await JobPosting.findById(args.jobId).populate('employer');
    },
    jobs: async () => {
      return await JobPosting.find({}).populate('employer');
    },
    employer: async (parent, args) => {
      return await Employer.findById(args.employerId).populate('jobPostings');
    },
    employers: async () => {
      return await Employer.find({});
    },
    employerJobs: async (parent, args) => {
      return await JobPosting.find({ employer: args.employerId }).populate('location');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    favoriteJob: async (parent, { jobId }, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { jobId } },
        { new: true }
      );

    }
  }
};

module.exports = resolvers;
