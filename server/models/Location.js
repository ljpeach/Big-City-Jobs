const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
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
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
