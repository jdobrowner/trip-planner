import { SELECT_TRIP } from './types';

function selectTrip(trip) {
  return {
    type: SELECT_TRIP,
    payload: trip
  }
}

export default selectTrip;
