import { SAVE_TRIP } from './types';

function saveTrip(trip) {
  return {
    type: SAVE_TRIP,
    payload: trip
  }
}

export default saveTrip;
