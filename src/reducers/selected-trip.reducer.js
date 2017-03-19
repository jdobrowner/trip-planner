import { SELECT_TRIP } from '../actions/types';

export default function selectedTrip(state = {}, action) {

  switch (action.type) {

    case SELECT_TRIP:
      // save the selected trip to local storage
      localStorage.setItem('selectedTrip', JSON.stringify(action.payload));
      return action.payload;

    default:
    	return state;
  }
};
