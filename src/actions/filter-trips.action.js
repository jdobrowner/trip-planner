import { FILTER_TRIPS } from './types';

function filterTrip(filter) {
  return {
    type: FILTER_TRIPS,
    payload: filter
  }
}

export default filterTrip;
