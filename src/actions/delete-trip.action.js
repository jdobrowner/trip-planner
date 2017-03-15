import { DELETE_TRIP } from './types';

function deleteTrip(tripTitle) {
  return {
    type: DELETE_TRIP,
    payload: tripTitle
  }
}

export default deleteTrip;
