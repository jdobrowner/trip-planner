import { combineReducers } from 'redux';
import savedTrips from './saved-trips.reducer';
import selectedTrip from './selected-trip.reducer';
import filter from './filter.reducer';

const rootReducer = combineReducers({
  savedTrips,
  selectedTrip,
  filter
});

export default rootReducer;
