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
	},
	postedDate: {
		type: Date,
		default: Date.now,
	},
	available: {
		type: Boolean,
		default: false,
	},
	applyLink: {
		type: String,
	},
	pay: {
		type: String,
		default: 'N/A',
	},
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
