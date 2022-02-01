import {
	ALL_ROOM_SUCCESS,
	ALL_ROOM_FAIL,
	CLEAR_ERROR,
} from '../constants/roomConstants';

export const allRoomsReducer = (state = { rooms: [] }, action) => {
	switch (action.type) {
		case ALL_ROOM_SUCCESS:
			return {
				success: true,
				roomsCount: action.payload.roomsCount,
				resPerPage: action.payload.resPerPage,
				rooms: action.payload.rooms,
			};
		case ALL_ROOM_FAIL:
			return {
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
