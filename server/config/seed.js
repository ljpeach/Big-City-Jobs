const db = require('./connection');
const { User, Location, Employer, JobPosting, } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
	console.log('cleaning database...');
	await cleanDB('JobPosting', 'jobpostings');
	await cleanDB('Employer', 'employers');
	await cleanDB('Location', 'locations');
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
			name: 'Local Gift Shop',
			website: 'https://github.com/ljpeach/',
			description: 'A quirky shop with tons of interesting trinkets known across town. Join our community!',
		},
		{
			name: 'Grocery Co-Op',
			website: 'https://github.com/ljpeach/',
			description: 'A Co-Op for groceries! Work with us and help run our store.',
		},
		{
			name: 'Cafe Down The Street',
			website: 'https://github.com/ljpeach/',
			description: 'A calm cafe with a good atmosphere and lovely customers. Be a part of one of the best relax spots in town!',
		},
		{
			name: 'Bike Shop',
			website: 'https://github.com/ljpeach',
			description: `Become another link in our chain as we service the bicyles that get people from point A to point B and get the wind through their hair! (through a helmet of course.)`,
		},
		{
			name: 'Fabric Store',
			website: 'https://github.com/ljpeach',
			description: 'Become a thread that binds together the fiber arts scene in town. Joan would be proud.',
		},
	]);
	console.log('employers seeded');

	// TODO: if we decide on localizing it to Chicago, we can insert neighborhoods/sections of the city.
	// the locations will be static and the user can choose between them via a checkbox, perhaps.
	// for now i just filled locations with some big cities.
	console.log('seeding locations');
	const locations = await Location.insertMany([
		{
			name: 'Oak Park',
		},
		{
			name: 'River Forest',
		},
		{
			name: 'Berwyn',
		},
		{
			name: 'Austin',
		},
		{
			name: 'Forest Park',
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
			name: 'Stocking and Cashier Position',
			location: locations[0],
			employer: employers[0],//gift shop
			details: 'We need a friendly worker to stock our shelves and run the register.',
			applyLink: 'https://www.linkedin.com/in/liam-peachey/',
			pay: '$45,000/yr',
			available: true,
		},
		{
			name: 'Delivery Driver',
			location: locations[1],
			employer: employers[1],//grocery
			details: 'Our store also delivers to local restraunts! Drive our truck to deliver supplies. Must have a CDL.',
			applyLink: 'https://www.linkedin.com/in/liam-peachey/',
			pay: '$45,000/yr',
			available: true,
		},
		{
			name: 'Barista',
			location: locations[2],
			employer: employers[2],//cafe
			details: 'Make our cool drinks! Bake our pastries! Contribute to our playlist! You get free drinks.',
			available: true,
			applyLink: 'https://www.linkedin.com/in/liam-peachey/',
			pay: '$45,000/yr',
		},
		{
			name: 'Technician',
			location: locations[3],
			employer: employers[3],//bike shop
			details: 'Perform maintenance on the bikes that come in. We will show you what to do so do not worry if you feel inexperienced.',
			available: true,
			applyLink: 'https://www.linkedin.com/in/liam-peachey/',
			pay: '$45,000/yr',
		},
		{
			name: 'Corner Knitter',
			location: locations[4],
			employer: employers[4],//fabric
			details: 'We feel like we need someone to sit in the corner of the shop and just knit all day. It would really enhance the vibe of our establishment.',
			available: true,
			applyLink: 'https://www.linkedin.com/in/liam-peachey/',
			pay: '$300,000/yr',
		},
	]);

	const moreJobPostings = [];

	const dummyTitle = ['Example Job Title', 'Example Position', 'Filler Position', 'Insert Position Here'];
	const dummyDesc = ['Filler Description', 'Example Description', 'Description Details (not real)', 'Text For Description'];
	for (let i = 0; i < 100; i++) {
		moreJobPostings.push({
			name: dummyTitle[Math.floor(Math.random() * dummyTitle.length)],
			location: locations[Math.floor(Math.random() * 5)],
			employer: employers[Math.floor(Math.random() * 5)],
			details: dummyDesc[Math.floor(Math.random() * dummyDesc.length)],
			available: ((Math.floor(Math.random() * 2) === 1) ? true : false),
			pay: '~What you expect',
		})
	}

	await JobPosting.insertMany(moreJobPostings);

	console.log('jobPostings seeded');

	console.log('seeding complete');
	process.exit();
});