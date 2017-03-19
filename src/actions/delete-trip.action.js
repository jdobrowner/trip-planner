import { DELETE_TRIP } from './types';

function deleteTrip(tripID) {
  return {
    type: DELETE_TRIP,
    payload: tripID
  }
}

export default deleteTrip;
