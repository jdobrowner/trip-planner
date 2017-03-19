import { UPDATE_TRIP } from './types';

function updateTrip(trip) {
  return {
    type: UPDATE_TRIP,
    payload: trip
  }
}

export default updateTrip;
