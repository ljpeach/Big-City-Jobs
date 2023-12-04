const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobPostingSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
		required: true,
	},
	employer: {
		type: Schema.Types.ObjectId,
		ref: 'Employer',
		required: true,
	},
	details: {
		type: String,
		default: 'There is no description for this job. Please contact the employer for information.',
	},
	available: {
		type: Boolean,
		default: true,
	},
	applyLink: {
		type: String,
	},
	pay: {
		type: String,
		default: 'N/A',
	},
	postedDate: {
		type: Date,
		default: Date.now,
	},
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
