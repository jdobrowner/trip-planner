import { SELECT_TRIP } from '../actions/types';

export default function selectedTrip(state = {}, action) {

  switch (action.type) {

    case SELECT_TRIP:
      return action.payload;

    default:
    	return state;
  }
};
