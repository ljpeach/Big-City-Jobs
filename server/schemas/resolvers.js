const { User, Employer, JobPosting, Location } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user);
        // const user = await User.findById(context.user._id); // keep just in case
        return await User.findById(context.user._id).populate('savedJobs');
      }

      throw AuthenticationError;
    },
    userJobsPages: async (parent, args, context) => {
      // pagelimit, pages
      if (context.user) {
        // console.log(context.user);
        // const user = await User.findById(context.user._id); // keep just in case
        const profile = await User.findById(context.user._id).populate('savedJobs');
        console.log(profile);
        let start = args.page * args.pageLimit;
        let end = start + args.pageLimit;
        if (start >= profile.savedJobs.length || args.pageLimit == 0) {
          return []
        }
        else if (end > arr.length) {
          end = arr.length;
        }
        profile.savedJobs = profile.savedJobs.slice(start, end);;
        return profile;
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
      return await JobPosting.findById(args.jobId).populate('employer').populate('location');
    },
    jobs: async () => {
      return await JobPosting.find({}).populate('employer').populate('location');
    },
    jobsPages: async (parent, args) => {

      return { jobs: await JobPosting.find({}).populate('employer').populate('location').skip(args.page * args.pageLimit).limit(args.pageLimit), count: await JobPosting.countDocuments({}) };
    },
    employer: async (parent, args) => {
      return await Employer.findById(args.employerId).populate('jobPostings');
    },
    employers: async () => {
      return await Employer.find({});
    },
    employerJobs: async (parent, args) => {
      return await JobPosting.find({ employer: args.employerId }).populate('location').populate('employer');
    },
    employerJobsPages: async (parent, args) => {
      return {
        jobs: await JobPosting.find({ employer: args.employerId }).populate('employer').populate('location').skip(args.page * args.pageLimit).limit(args.pageLimit), count: await JobPosting.countDocuments({ employer: args.employerId })
      };
    },

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
        { $addToSet: { savedJobs: jobId } },
        { new: true }
      );
    },
    removeJob: async (parent, { jobId }, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedJobs: jobId } },
        { new: true }
      );
    },
  }
};

module.exports = resolvers;
