import { LOAD_TRIPS, SAVE_TRIP, UPDATE_TRIP, DELETE_TRIP } from '../actions/types';

export default function savedTrips(state = [], action) {
  let nextState;
  switch (action.type) {

    case LOAD_TRIPS:
      return action.payload;

    case SAVE_TRIP:
      // make a copy of the saved trips array and add the new trip to it
      nextState = [ ...state, action.payload ];
      // save the new saved trips array to local storage
      localStorage.setItem('trips', JSON.stringify(nextState));
      // set the value of the savedTrips in the global state to be the new saved trips array
    	return nextState;

    case UPDATE_TRIP:
      nextState = state.map( trip => {
        if (trip.ID === action.payload.ID) return action.payload;
        else return trip;
      });
      localStorage.setItem('trips', JSON.stringify(nextState));
      return nextState;

    case DELETE_TRIP:
      nextState = state.filter( trip => trip.ID !== action.payload );
      localStorage.setItem('trips', JSON.stringify(nextState));
    	return nextState;

    default:
    	return state;
  }
};
