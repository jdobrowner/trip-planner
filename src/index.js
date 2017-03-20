import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers/root.reducer';
import { LOAD_TRIPS, SELECT_TRIP } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const savedTrips = JSON.parse(localStorage.getItem('trips'));
const selectedTrip = JSON.parse(localStorage.getItem('selectedTrip'));
if (savedTrips) {
	store.dispatch({ type: LOAD_TRIPS, payload: savedTrips });
}
if (selectedTrip) {
	store.dispatch({ type: SELECT_TRIP, payload: selectedTrip });
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('.container'));
