import { combineReducers } from 'redux';
import savedTrips from './saved-trips.reducer';

const rootReducer = combineReducers({
  savedTrips
});

export default rootReducer;
