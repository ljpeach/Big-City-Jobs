const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobPostingSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	locationId: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
		required: true,
	},
	employerId: {
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
	}
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
