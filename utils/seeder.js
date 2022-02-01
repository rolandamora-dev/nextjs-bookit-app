const Room = require('../models/room');
const rooms = require('../data/rooms.json');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/bookit', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to DB'));

const seedRooms = async () => {
	try {
		await Room.deleteMany();
		console.log('Rooms are deleted');

		await Room.insertMany(rooms);
		console.log('Rooms are added');

		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

seedRooms();
