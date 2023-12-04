const db = require('./connection');
const { User, Location, Employer, JobPosting, } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
	console.log('cleaning database...');
	await cleanDB('JobPosting', 'JobPosting');
	await cleanDB('Employer', 'Employer');
	await cleanDB('Location', 'Location');
	await cleanDB('User', 'users');
	console.log('database cleaned');

	console.log('seeding a user');
	await User.create({
		firstName: 'John',
		lastName: 'Doe',
		email: 'jdoe@gmail.com',
		password: 'password'
	});
	console.log('seeded user');

	console.log('seeding employers');
	const employers = await Employer.insertMany([
		{
			name: 'Alphabet',
			website: 'https://www.google.com/',
			description: 'The parent company for the largest search engine in the world.',
		},
		{
			name: 'Amazon',
			website: 'https://www.amazon.com/',
			description: 'Offering jobs from Software Development to Warehouse Management. Come join us!',
		},
		{
			name: 'X',
			website: 'https://www.x.com/',
			description: 'help please the website is on fire',
		},
		{
			name: 'CIA',
			website: 'https://www.cia.gov',
			description: `shhh, it's a secret`,
		},
		{
			name: 'The man in the sewer',
			website: 'N/A',
			description: 'accept my quest',
		},
	]);
	console.log('employers seeded');

	// TODO: if we decide on localizing it to Chicago, we can insert neighborhoods/sections of the city.
	// the locations will be static and the user can choose between them via a checkbox, perhaps.
	// for now i just filled locations with some big cities.
	console.log('seeding locations');
	const locations = await Location.insertMany([
		{
			name: 'Chicago',
		},
		{
			name: 'New York',
		},
		{
			name: 'Los Angeles',
		},
		{
			name: 'Houston',
		},
		{
			name: 'Remote',
		},
	]);
	console.log('locations seeded');

	// TODO: create a loop that will fill an array of a hundred jobPosting objects with dummy data
	// for now, i have filled out a few jobs for testing out display. at some point though, we will
	// want to test how the website looks with lots of postings, so we will just create a hundred
	// dummy datas with random stuff in them.
	console.log('seeding jobPostings');
	const jobPostings = await JobPosting.insertMany([
		{
			name: 'Software Engineer',
			location: locations[4],
			employer: employers[0],
			details: 'Become a Software Engineer for Google!',
			available: true,
			applyLink: 'N/A',
			pay: '$90,000/yr',
		},
		{
			name: 'Secret Agent',
			location: locations[0],
			employer: employers[3],
			details: 'Shhhhhhh',
			available: true,
		},
		{
			name: 'Find My Dog',
			location: locations[1],
			employer: employers[4],
			details: 'my dog is lost find him',
			available: true,
			pay: '$20',
		},
		{
			name: 'Fix this website everything is on fire!!!',
			location: locations[2],
			employer: employers[2],
			details: 'help please everything is broken',
			available: true,
			pay: '$300,000/yr',
		},
	]);
	console.log('jobPostings seeded');

	console.log('seeding complete');
});