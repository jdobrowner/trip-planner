import { expect } from './test_helper';
import { SAVE_TRIP, DELETE_TRIP } from '../src/actions/types';
import saveTrip from '../src/actions/save-trip.action';
import deleteTrip from '../src/actions/delete-trip.action';


describe('Save Trip Action', () => {
  const trip = { title: 'Mexico' };
  const action = { type: SAVE_TRIP, payload: trip };
  it('creates the save-trip action object', () => {
    expect(saveTrip(trip)).to.eql(action);
  });
});

describe('Delete Trip Action', () => {
  const tripTitle = 'Mexico';
  const action = { type: DELETE_TRIP, payload: tripTitle };
  it('creates the delete-trip action object', () => {
    expect(deleteTrip(tripTitle)).to.eql(action);
  });
});
