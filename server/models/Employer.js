const mongoose = require('mongoose');

const { Schema } = mongoose;

const employerSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	jobPostings: [
		{
			type: Schema.Types.ObjectId,
			ref: 'JobPosting',
		}
	],
	website: {
		type: String,
	},
	description: {
		type: String,
	},
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
