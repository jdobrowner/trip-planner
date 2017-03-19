import { FILTER_TRIPS } from '../actions/types';

export default function filterTrip(state = { keyword: '', category: 'None' }, action) {

  switch (action.type) {

    case FILTER_TRIPS:
      return action.payload;

    default:
    	return state;
  }
};
