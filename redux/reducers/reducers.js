import { combineReducers } from 'redux';
import { allRoomsReducer } from '../reducers/roomReducer';

const reducer = combineReducers({ allRooms: allRoomsReducer });

export default reducer;
