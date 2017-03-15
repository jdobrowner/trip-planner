import { expect } from './test_helper';
import { LOAD_TRIPS, SAVE_TRIP, DELETE_TRIP } from '../src/actions/types';
import savedTrips from '../src/reducers/saved-trips.reducer';

describe('Saved Trips Reducer', () => {


  let action = {};
  it('sets the default savedTrips value to an empty array', () => {
    expect(savedTrips(undefined, action)).to.eql([]);
  });

  it('initializes a local stored array', () => {
    const localStore = [{ title: 'Mexico'}, {title: 'Japan'}];
    action = { type: LOAD_TRIPS, payload: localStore };
    expect(savedTrips(undefined, action)).to.eql(localStore);
  });

  // must set environment to 'testing'
  // because of localStorage call within the savedTrips reducer

  // it('saves a new trip', () => {
  //   const newTrip = [{ title: 'Japan'}]
  //   const withTrip = [{ title: 'Mexico'}, {title: 'Japan'}];
  //   const withoutTrip = [{ title: 'Mexico'}]
  //   action = { type: SAVE_TRIP, payload: newTrip };
  //   expect(savedTrips(withoutTrip, action)).to.eql(withTrip);
  // });

  // it('deletes a trip', () => {
  //   const tripToDelete = 'Mexico';
  //   const withTrip = [{ title: 'Mexico'}, {title: 'Japan'}];
  //   const withoutTrip = [{ title: 'Japan'}]
  //   action = { type: DELETE_TRIP, payload: tripToDelete };
  //   expect(savedTrips(withTrip, action)).to.eql(withoutTrip);
  // });
});
