import { SAVE_TRIP } from './types';

function saveTrip(trip) {
  console.log(SAVE_TRIP);
  return {
    type: SAVE_TRIP,
    payload: trip
  }
}

export default saveTrip;
