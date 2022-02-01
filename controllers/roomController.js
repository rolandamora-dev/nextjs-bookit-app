import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

const allRooms = catchAsyncErrors(async (req, res) => {
	const resPerPage = 6;
	const roomsCount = await Room.countDocuments();

	const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

	// const rooms = await apiFeatures.query;
	// let filteredRoomsCount = rooms.length;

	apiFeatures.pagination(resPerPage);
	const rooms = await apiFeatures.query;

	res.status(200).json({
		success: true,
		roomsCount,
		resPerPage,
		rooms,
	});
});

// GET room   => /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
	// try {
	// 	const room = await Room.findById(req.query.id);

	// 	if (!room) {
	// 		// res.status(400).json({
	// 		// 	success: false,
	// 		// 	error: 'Room not found',
	// 		// });
	// 		return next(new ErrorHandler('Room not found', 404));
	// 	}
	// 	res.status(200).json({
	// 		success: true,
	// 		room,
	// 	});
	// } catch (err) {
	// 	res.status(400).json({
	// 		success: false,
	// 		error: error.message,
	// 	});
	// }
	const room = await Room.findById(req.query.id);
	res.status(200).json({
		success: true,
		room,
	});
});

// Create new room   => /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
	// try {
	// 	const room = await Room.create(req.body);
	// 	res.status(200).json({
	// 		success: true,
	// 		room,
	// 	});
	// } catch (err) {
	// 	res.status(400).json({
	// 		success: false,
	// 		error: error.message,
	// 	});
	// }
	const room = await Room.create(req.body);
	res.status(200).json({
		success: true,
		room,
	});
});

// UPDATE room   => /api/rooms/:id
const updateRoom = async (req, res) => {
	try {
		let room = await Room.findById(req.query.id);

		if (!room) {
			// res.status(400).json({
			// 	success: false,
			// 	error: 'Room not found',
			// });
			return next(new ErrorHandler('Room not found', 404));
		}

		room = await Room.findByIdAndUpdate(req.query.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});

		res.status(200).json({
			success: true,
			room,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

// DELETE room   => /api/rooms/:id
const deleteRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.query.id);

		if (!room) {
			// res.status(400).json({
			// 	success: false,
			// 	error: 'Room not found',
			// });
			return next(new ErrorHandler('Room not found', 404));
		}

		await room.remove();

		res.status(200).json({
			success: true,
			room,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
